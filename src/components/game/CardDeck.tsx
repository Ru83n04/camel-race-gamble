import React from 'react';
import { Card } from './types';
import { PlayingCard } from './PlayingCard';
import { cn } from '@/lib/utils';

interface CardDeckProps {
  remainingCards: number;
  currentCard: Card | null;
  onDrawCard: () => void;
  isPlaying: boolean;
  isAnimating: boolean;
  isShuffling: boolean;
}

export const CardDeck: React.FC<CardDeckProps> = ({
  remainingCards,
  currentCard,
  onDrawCard,
  isPlaying,
  isAnimating,
  isShuffling,
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Shuffle overlay */}
      {isShuffling && (
        <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-2xl border-4 border-primary animate-bounce-in text-center">
            <div className="text-4xl sm:text-6xl mb-4 shuffle-animation">
              🃏🔀🃏
            </div>
            <p className="font-game text-xl sm:text-2xl text-primary">
              Karten werden gemischt...
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Das Deck wird neu gemischt!
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 sm:gap-8">
        {/* Draw pile */}
        <div className="relative">
          <button
            onClick={onDrawCard}
            disabled={!isPlaying || isAnimating || isShuffling}
            className={cn(
              "relative transition-all duration-200 transform",
              isPlaying && !isAnimating && !isShuffling
                ? "hover:scale-105 active:scale-95 cursor-pointer pulse-glow rounded-lg" 
                : "opacity-50 cursor-not-allowed"
            )}
          >
            {/* Stacked cards effect */}
            {remainingCards > 2 && (
              <div className="absolute top-1 left-1 w-12 h-18 sm:w-16 sm:h-24 rounded-lg bg-card-back-gradient border-2 border-primary/20" />
            )}
            {remainingCards > 1 && (
              <div className="absolute top-0.5 left-0.5 w-12 h-18 sm:w-16 sm:h-24 rounded-lg bg-card-back-gradient border-2 border-primary/25" />
            )}
            <PlayingCard size="md" isRevealed={false} />
          </button>
          
          {/* Remaining count */}
          <div className={cn(
            "absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg transition-all",
            remainingCards === 0 && "bg-accent animate-pulse"
          )}>
            {remainingCards}
          </div>
        </div>

        {/* Arrow */}
        <span className="text-2xl sm:text-3xl text-muted-foreground animate-pulse">→</span>

        {/* Current card */}
        <div className="relative">
          {currentCard ? (
            <PlayingCard 
              card={currentCard} 
              isRevealed={true} 
              size="md"
              isFlipping={isAnimating}
            />
          ) : (
            <div className="w-12 h-18 sm:w-16 sm:h-24 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-muted-foreground text-xs sm:text-sm text-center px-1">
                Zieh eine Karte!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      {isPlaying && !isShuffling && (
        <p className="text-sm text-muted-foreground text-center">
          {remainingCards === 0 
            ? "Tippe zum Mischen!" 
            : "Tippe auf den Kartenstapel zum Ziehen"}
        </p>
      )}
    </div>
  );
};
