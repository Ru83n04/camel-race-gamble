import React from 'react';
import { Card, SUIT_SYMBOLS } from './types';
import { cn } from '@/lib/utils';

interface PlayingCardProps {
  card?: Card | null;
  isRevealed?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isFlipping?: boolean;
  className?: string;
}

const suitColors: Record<string, string> = {
  hearts: 'text-hearts',
  diamonds: 'text-diamonds',
  clubs: 'text-clubs',
  spades: 'text-spades',
};

export const PlayingCard: React.FC<PlayingCardProps> = ({ 
  card, 
  isRevealed = true, 
  size = 'md',
  isFlipping,
  className 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-12 text-xs sm:w-10 sm:h-14 sm:text-sm',
    md: 'w-12 h-18 text-sm sm:w-16 sm:h-24 sm:text-base',
    lg: 'w-16 h-24 text-base sm:w-20 sm:h-30 sm:text-lg',
  };

  if (!isRevealed || !card) {
    return (
      <div 
        className={cn(
          "rounded-lg bg-card-back-gradient border-2 border-primary/30 shadow-lg flex items-center justify-center",
          sizeClasses[size],
          isFlipping && "card-flip",
          className
        )}
      >
        <div className="w-3/4 h-3/4 rounded border border-primary-foreground/30 flex items-center justify-center">
          <span className="text-primary-foreground/60 text-lg">🐪</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "rounded-lg bg-card-gradient border-2 border-border shadow-lg flex flex-col items-center justify-between p-1",
        sizeClasses[size],
        isFlipping && "card-flip",
        className
      )}
    >
      <div className={cn("self-start font-bold", suitColors[card.suit])}>
        {card.value}
      </div>
      <div className={cn("text-2xl sm:text-3xl", suitColors[card.suit])}>
        {SUIT_SYMBOLS[card.suit]}
      </div>
      <div className={cn("self-end font-bold rotate-180", suitColors[card.suit])}>
        {card.value}
      </div>
    </div>
  );
};
