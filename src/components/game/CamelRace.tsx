import React from 'react';
import { useGameLogic } from './useGameLogic';
import { GameHeader } from './GameHeader';
import { RaceTrack } from './RaceTrack';
import { CardDeck } from './CardDeck';
import { GameInfo } from './GameInfo';

export const CamelRace: React.FC = () => {
  const { gameState, drawCard, startGame, resetGame, isAnimating } = useGameLogic();

  return (
    <div className="min-h-screen bg-desert-gradient flex flex-col">
      {/* Header */}
      <GameHeader
        gamePhase={gameState.gamePhase}
        winner={gameState.winner}
        onStart={startGame}
        onReset={resetGame}
      />

      {/* Main game area */}
      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-2 pb-6">
        {/* Race Track */}
        <RaceTrack
          camels={gameState.camels}
          penaltyCards={gameState.penaltyCards}
          winner={gameState.winner}
          movingCamel={isAnimating ? gameState.currentCard?.suit : undefined}
        />

        {/* Card area - only show when playing */}
        {gameState.gamePhase !== 'waiting' && (
          <>
            <CardDeck
              remainingCards={gameState.deck.length}
              currentCard={gameState.currentCard}
              onDrawCard={drawCard}
              isPlaying={gameState.gamePhase === 'playing'}
              isAnimating={isAnimating}
            />

            <GameInfo drawnCards={gameState.drawnCards} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-muted-foreground">
        <p>🍺 Trinkspiel: Wer falsch tippt, trinkt! 🍺</p>
      </footer>
    </div>
  );
};
