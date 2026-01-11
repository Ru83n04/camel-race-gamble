import React from 'react';
import { Suit, SUIT_SYMBOLS } from './types';
import { cn } from '@/lib/utils';

interface CamelProps {
  suit: Suit;
  isMoving?: boolean;
  isWinner?: boolean;
}

const suitColors: Record<Suit, string> = {
  hearts: 'text-hearts',
  diamonds: 'text-diamonds',
  clubs: 'text-clubs',
  spades: 'text-spades',
};

const camelBodyColors: Record<Suit, string> = {
  hearts: 'from-amber-200 to-amber-300',
  diamonds: 'from-amber-100 to-amber-200',
  clubs: 'from-amber-300 to-amber-400',
  spades: 'from-amber-200 to-amber-350',
};

export const Camel: React.FC<CamelProps> = ({ suit, isMoving, isWinner }) => {
  return (
    <div 
      className={cn(
        "relative flex flex-col items-center transition-all duration-300",
        isMoving && "camel-bounce",
        isWinner && "scale-110"
      )}
    >
      {/* Camel SVG */}
      <svg 
        viewBox="0 0 64 48" 
        className={cn(
          "w-12 h-9 sm:w-16 sm:h-12 drop-shadow-lg",
          isMoving && "camel-walk"
        )}
      >
        {/* Camel body */}
        <ellipse cx="32" cy="28" rx="18" ry="12" className="fill-amber-300" />
        
        {/* Hump */}
        <ellipse cx="32" cy="18" rx="8" ry="8" className="fill-amber-300" />
        
        {/* Head */}
        <ellipse cx="50" cy="18" rx="7" ry="6" className="fill-amber-200" />
        
        {/* Snout */}
        <ellipse cx="56" cy="20" rx="4" ry="3" className="fill-amber-100" />
        
        {/* Eye */}
        <circle cx="51" cy="16" r="2" className="fill-foreground" />
        <circle cx="51.5" cy="15.5" r="0.5" className="fill-white" />
        
        {/* Ears */}
        <ellipse cx="46" cy="12" rx="2" ry="3" className="fill-amber-300" />
        
        {/* Legs */}
        <rect x="20" y="36" width="4" height="10" rx="2" className="fill-amber-400" />
        <rect x="28" y="36" width="4" height="10" rx="2" className="fill-amber-400" />
        <rect x="36" y="36" width="4" height="10" rx="2" className="fill-amber-400" />
        <rect x="44" y="36" width="4" height="10" rx="2" className="fill-amber-400" />
        
        {/* Tail */}
        <path d="M14 28 Q10 24 12 20" stroke="hsl(var(--sand-dark))" strokeWidth="2" fill="none" strokeLinecap="round" />
        
        {/* Symbol on body - background circle */}
        <circle cx="32" cy="26" r="7" className="fill-white/90" />
      </svg>
      
      {/* Card symbol on the camel */}
      <span 
        className={cn(
          "absolute top-3 sm:top-4 text-sm sm:text-lg font-bold",
          suitColors[suit]
        )}
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
      >
        {SUIT_SYMBOLS[suit]}
      </span>
      
      {/* Winner crown */}
      {isWinner && (
        <div className="absolute -top-4 text-lg animate-bounce-in">
          👑
        </div>
      )}
    </div>
  );
};
