export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export type CardValue = '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  suit: Suit;
  value: CardValue;
}

export interface CamelState {
  suit: Suit;
  position: number; // 0-8, 8 is the finish line
}

export interface PenaltyCard {
  position: number; // 1-7, corresponding to track positions
  revealed: boolean;
  card: Card | null;
}

export interface GameState {
  camels: CamelState[];
  deck: Card[];
  penaltyCards: PenaltyCard[];
  currentCard: Card | null;
  gamePhase: 'waiting' | 'playing' | 'finished';
  winner: Suit | null;
  drawnCards: Card[];
}

export const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];

export const CARD_VALUES: CardValue[] = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const SUIT_SYMBOLS: Record<Suit, string> = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠',
};

export const SUIT_NAMES_DE: Record<Suit, string> = {
  hearts: 'Herz',
  diamonds: 'Karo',
  clubs: 'Kreuz',
  spades: 'Pik',
};
