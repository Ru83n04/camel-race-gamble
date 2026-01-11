import React, { useState } from 'react';
import { Card as CardType, SUIT_SYMBOLS, SUITS } from './types';
import { cn } from '@/lib/utils';

interface GameInfoProps {
  drawnCards: CardType[];
}

const suitColors: Record<string, string> = {
  hearts: 'text-hearts',
  diamonds: 'text-diamonds',
  clubs: 'text-clubs',
  spades: 'text-spades',
};

export const GameInfo: React.FC<GameInfoProps> = ({ drawnCards }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Count cards per suit
  const cardCounts = SUITS.reduce((acc, suit) => {
    acc[suit] = drawnCards.filter(c => c.suit === suit).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="w-full max-w-lg mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-card/80 backdrop-blur rounded-xl px-4 py-3 shadow-md border border-border"
      >
        <span className="font-medium text-sm">Statistik</span>
        <div className="flex items-center gap-3">
          {SUITS.map(suit => (
            <span key={suit} className={cn("text-sm", suitColors[suit])}>
              {SUIT_SYMBOLS[suit]} {cardCounts[suit]}
            </span>
          ))}
          <span className="text-muted-foreground ml-2">
            {isOpen ? '▲' : '▼'}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="mt-2 bg-card rounded-xl p-4 shadow-md border border-border animate-slide-up">
          <h3 className="font-medium text-sm mb-2 text-muted-foreground">
            Gezogene Karten ({drawnCards.length})
          </h3>
          <div className="flex flex-wrap gap-1">
            {drawnCards.length === 0 ? (
              <p className="text-muted-foreground text-sm">Noch keine Karten gezogen</p>
            ) : (
              drawnCards.map((card, index) => (
                <span 
                  key={index} 
                  className={cn(
                    "inline-flex items-center bg-background rounded px-2 py-0.5 text-sm font-medium border",
                    suitColors[card.suit]
                  )}
                >
                  {card.value}{SUIT_SYMBOLS[card.suit]}
                </span>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
