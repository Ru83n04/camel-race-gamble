import React from 'react';
import { SUIT_SYMBOLS, SUIT_NAMES_DE, Suit } from './types';
import { cn } from '@/lib/utils';

interface GameHeaderProps {
  gamePhase: 'waiting' | 'playing' | 'finished';
  winner: Suit | null;
  onStart: () => void;
  onReset: () => void;
}

const suitColors: Record<Suit, string> = {
  hearts: 'text-hearts',
  diamonds: 'text-diamonds',
  clubs: 'text-clubs',
  spades: 'text-spades',
};

export const GameHeader: React.FC<GameHeaderProps> = ({
  gamePhase,
  winner,
  onStart,
  onReset,
}) => {
  return (
    <header className="text-center space-y-4 py-4">
      <h1 className="font-game text-3xl sm:text-5xl text-primary tracking-wide drop-shadow-lg">
        🐪 Kamelrennen 🐪
      </h1>
      
      {gamePhase === 'waiting' && (
        <div className="space-y-4 animate-slide-up">
          <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
            Wer gewinnt das Rennen durch die Wüste?
            Ziehe Karten und beobachte, welches Kamel als erstes das Ziel erreicht!
          </p>
          <button
            onClick={onStart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-xl text-lg shadow-lg transform transition-all hover:scale-105 active:scale-95"
          >
            🏁 Spiel starten!
          </button>
        </div>
      )}

      {gamePhase === 'playing' && (
        <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
          <span className="text-muted-foreground">Wer wird gewinnen?</span>
          <div className="flex gap-2">
            {(['hearts', 'diamonds', 'clubs', 'spades'] as Suit[]).map(suit => (
              <span key={suit} className={cn("text-xl", suitColors[suit])}>
                {SUIT_SYMBOLS[suit]}
              </span>
            ))}
          </div>
        </div>
      )}

      {gamePhase === 'finished' && winner && (
        <div className="space-y-4 animate-bounce-in">
          <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-xl border-4 border-primary max-w-sm mx-auto">
            <p className="text-lg sm:text-xl font-bold mb-2">🎉 Gewinner! 🎉</p>
            <p className={cn("text-4xl sm:text-6xl font-bold", suitColors[winner])}>
              {SUIT_SYMBOLS[winner]} {SUIT_NAMES_DE[winner]}
            </p>
            <p className="mt-4 text-muted-foreground text-sm">
              Alle, die auf {SUIT_NAMES_DE[winner]} gesetzt haben, dürfen verteilen! 🍻
            </p>
          </div>
          <button
            onClick={onReset}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 px-8 rounded-xl text-lg shadow-lg transform transition-all hover:scale-105 active:scale-95"
          >
            🔄 Neues Spiel
          </button>
        </div>
      )}
    </header>
  );
};
