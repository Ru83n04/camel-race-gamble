import React from 'react';
import { CamelState, PenaltyCard, Suit } from './types';
import { Camel } from './Camel';
import { PlayingCard } from './PlayingCard';
import { cn } from '@/lib/utils';

interface RaceTrackProps {
  camels: CamelState[];
  penaltyCards: PenaltyCard[];
  winner: Suit | null;
  movingCamel?: Suit;
}

export const RaceTrack: React.FC<RaceTrackProps> = ({ 
  camels, 
  penaltyCards, 
  winner,
  movingCamel 
}) => {
  // Track positions 0-6, with 6 being the finish (2 fewer steps)
  const positions = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[320px] px-2">
        {/* Penalty cards row - now 5 cards + start + finish = 7 columns */}
        <div className="flex justify-center mb-2">
          <div className="grid grid-cols-7 gap-1 sm:gap-2 w-full max-w-md">
            <div className="flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Start</span>
            </div>
            {penaltyCards.map((penalty) => (
              <div key={penalty.position} className="flex items-center justify-center">
                <PlayingCard 
                  card={penalty.card} 
                  isRevealed={penalty.revealed} 
                  size="sm"
                  isFlipping={penalty.revealed}
                />
              </div>
            ))}
            <div className="flex items-center justify-center">
              <span className="text-lg">🏁</span>
            </div>
          </div>
        </div>

        {/* Race track */}
        <div className="bg-sand-gradient rounded-2xl p-2 sm:p-4 border-4 border-sand-dark shadow-inner">
          {/* Position markers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
            {positions.map((pos) => (
              <div 
                key={pos} 
                className={cn(
                  "h-2 sm:h-3 rounded-full",
                  pos === 6 
                    ? "bg-oasis" 
                    : pos === 0 
                      ? "bg-terracotta" 
                      : "bg-sand-dark/50"
                )}
              />
            ))}
          </div>

          {/* Camel lanes */}
          {camels.map((camel) => (
            <div 
              key={camel.suit} 
              className="grid grid-cols-7 gap-1 sm:gap-2 py-1 border-b border-sand-dark/20 last:border-b-0"
            >
              {positions.map((pos) => (
                <div 
                  key={pos} 
                  className={cn(
                    "flex items-center justify-center min-h-[48px] sm:min-h-[64px] rounded-lg transition-colors",
                    pos === camel.position && "bg-white/30",
                    pos === 6 && camel.position === 6 && "bg-oasis/30"
                  )}
                >
                  {pos === camel.position && (
                    <Camel 
                      suit={camel.suit} 
                      isMoving={movingCamel === camel.suit}
                      isWinner={winner === camel.suit}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Track decorations */}
          <div className="flex justify-between mt-2 text-xs sm:text-sm text-muted-foreground">
            <span>🌵</span>
            <span>🌴</span>
            <span>☀️</span>
            <span>🌵</span>
            <span>🏜️</span>
          </div>
        </div>
      </div>
    </div>
  );
};
