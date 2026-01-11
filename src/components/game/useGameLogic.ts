import { useState, useCallback } from 'react';
import { 
  GameState, 
  Card, 
  Suit, 
  SUITS, 
  CARD_VALUES,
  PenaltyCard,
  CamelState 
} from './types';

// Create a standard Skat deck (32 cards)
const createDeck = (): Card[] => {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const value of CARD_VALUES) {
      deck.push({ suit, value });
    }
  }
  return deck;
};

// Fisher-Yates shuffle
const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Initialize penalty cards (hidden cards above the track) - now 5 cards for 6 positions
const createPenaltyCards = (deck: Card[]): { penaltyCards: PenaltyCard[], remainingDeck: Card[] } => {
  const penaltyCards: PenaltyCard[] = [];
  const remainingDeck = [...deck];
  
  for (let i = 1; i <= 5; i++) {
    const card = remainingDeck.pop()!;
    penaltyCards.push({
      position: i,
      revealed: false,
      card,
    });
  }
  
  return { penaltyCards, remainingDeck };
};

const initialCamels: CamelState[] = SUITS.map(suit => ({
  suit,
  position: 0,
}));

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const deck = shuffleDeck(createDeck());
    const { penaltyCards, remainingDeck } = createPenaltyCards(deck);
    return {
      camels: initialCamels,
      deck: remainingDeck,
      penaltyCards,
      currentCard: null,
      gamePhase: 'waiting',
      winner: null,
      drawnCards: [],
    };
  });

  const [isAnimating, setIsAnimating] = useState(false);

  const startGame = useCallback(() => {
    const deck = shuffleDeck(createDeck());
    const { penaltyCards, remainingDeck } = createPenaltyCards(deck);
    setGameState({
      camels: SUITS.map(suit => ({ suit, position: 0 })),
      deck: remainingDeck,
      penaltyCards,
      currentCard: null,
      gamePhase: 'playing',
      winner: null,
      drawnCards: [],
    });
  }, []);

  const checkPenaltyCards = useCallback((camels: CamelState[], penaltyCards: PenaltyCard[]): { 
    updatedCamels: CamelState[], 
    updatedPenaltyCards: PenaltyCard[],
    revealedCard: Card | null 
  } => {
    const updatedPenaltyCards = [...penaltyCards];
    let updatedCamels = [...camels];
    let revealedCard: Card | null = null;

    // Check each penalty position from 1 to 5
    for (let pos = 1; pos <= 5; pos++) {
      const penaltyCardIndex = updatedPenaltyCards.findIndex(p => p.position === pos && !p.revealed);
      if (penaltyCardIndex === -1) continue;

      // Check if all camels have reached or passed this position
      const allCamelsPassedPosition = updatedCamels.every(c => c.position >= pos);
      
      if (allCamelsPassedPosition) {
        // Reveal the penalty card
        const penaltyCard = updatedPenaltyCards[penaltyCardIndex];
        updatedPenaltyCards[penaltyCardIndex] = { ...penaltyCard, revealed: true };
        revealedCard = penaltyCard.card;

        // Move the corresponding camel back one step
        if (penaltyCard.card) {
          updatedCamels = updatedCamels.map(camel => 
            camel.suit === penaltyCard.card!.suit 
              ? { ...camel, position: Math.max(0, camel.position - 1) }
              : camel
          );
        }
        break; // Only reveal one card at a time
      }
    }

    return { updatedCamels, updatedPenaltyCards, revealedCard };
  }, []);

  const drawCard = useCallback(() => {
    if (gameState.gamePhase !== 'playing' || isAnimating) {
      return;
    }

    setIsAnimating(true);

    setGameState(prev => {
      let newDeck = [...prev.deck];
      
      // If deck is empty, reshuffle all drawn cards
      if (newDeck.length === 0) {
        newDeck = shuffleDeck([...prev.drawnCards]);
      }
      
      const drawnCard = newDeck.pop()!;
      
      // Move the camel forward (goal is now at position 6)
      let newCamels = prev.camels.map(camel => 
        camel.suit === drawnCard.suit 
          ? { ...camel, position: Math.min(6, camel.position + 1) }
          : camel
      );

      // Check for penalty cards
      const { updatedCamels, updatedPenaltyCards } = checkPenaltyCards(newCamels, prev.penaltyCards);
      newCamels = updatedCamels;

      // Check for winner (goal is now at position 6)
      const winner = newCamels.find(c => c.position >= 6);
      
      return {
        ...prev,
        deck: newDeck,
        currentCard: drawnCard,
        camels: newCamels,
        penaltyCards: updatedPenaltyCards,
        drawnCards: [...prev.drawnCards, drawnCard],
        gamePhase: winner ? 'finished' : 'playing',
        winner: winner?.suit || null,
      };
    });

    setTimeout(() => setIsAnimating(false), 600);
  }, [gameState.gamePhase, gameState.deck.length, isAnimating, checkPenaltyCards]);

  const resetGame = useCallback(() => {
    const deck = shuffleDeck(createDeck());
    const { penaltyCards, remainingDeck } = createPenaltyCards(deck);
    setGameState({
      camels: SUITS.map(suit => ({ suit, position: 0 })),
      deck: remainingDeck,
      penaltyCards,
      currentCard: null,
      gamePhase: 'waiting',
      winner: null,
      drawnCards: [],
    });
  }, []);

  return {
    gameState,
    drawCard,
    startGame,
    resetGame,
    isAnimating,
  };
};
