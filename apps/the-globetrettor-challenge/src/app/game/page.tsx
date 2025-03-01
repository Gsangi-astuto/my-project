'use client';

import React from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { useUser } from './contexts/UserContext';
import { useRouter } from 'next/navigation';
import SadEmoji from './components/SadEmoji';
import Button from '../components/Button/Button';
import Header from './components/Header';
import Timer from './components/Timer';
import { GAME_DURATION } from './constants';
import CityImage from './components/CityImage';

const Game = () => {
  const router = useRouter();
  const { username } = useUser();
  const {
    gameState,
    score,
    isLoading,
    error,
    checkIfOptionIsCorrect,
    timeLeft,
    isGameOver,
    showSadEmoji,
    resetGame,
    ConfettiComponent,
    isPaused,
    handlePause,
    handleResume,
  } = useGameLogic();

  React.useEffect(() => {
    if (!username) {
      router.push('/');
    }
  }, [username, router]);

  const handleLeaderboard = () => {
    router.push('/leaderboard');
  };

  const handlePlayAgain = () => {
    resetGame();
  };

  const handleHome = () => {
    router.push('/');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getOptionClassName = (option: string) => {
    if (!gameState.isAnswered) {
      return 'bg-primary-orange-1 hover:bg-primary-orange-2';
    }

    if (option === gameState.correctAnswer) {
      return 'bg-green-500 text-white';
    }

    if (
      option === gameState.selectedAnswer &&
      option !== gameState.correctAnswer
    ) {
      return 'bg-red-500 text-white';
    }

    return 'bg-gray-400 text-gray-700 opacity-50';
  };

  const renderOptionContent = (option: string) => {
    if (!gameState.isAnswered) {
      return option;
    }

    return (
      <div className="flex items-center justify-center gap-2">
        {option}
        {option === gameState.selectedAnswer &&
          option !== gameState.correctAnswer && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
      </div>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading question: {error.message}</div>;

  if (isGameOver) {
    return (
      <div className="p-4 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4 text-primary-font-1">
          Game Over!
        </h1>
        <p className="text-xl mb-4 text-primary-font-1">Final Score: {score}</p>
        <div className="space-x-4">
          <Button
            onClick={handlePlayAgain}
            className="bg-primary-orange-1 hover:bg-primary-orange-2 text-primary-font-1 transform hover:scale-105 transition-transform duration-200"
          >
            Play Again
          </Button>
          <Button
            onClick={handleLeaderboard}
            className="bg-primary-orange-1 hover:bg-primary-orange-2 text-primary-font-1 transform hover:scale-105 transition-transform duration-200"
          >
            View Leaderboard
          </Button>
          <Button
            onClick={handleHome}
            className="bg-gray-500 hover:bg-gray-600 text-white transform hover:scale-105 transition-transform duration-200"
          >
            Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-50 pointer-events-none">
        {ConfettiComponent}
        <SadEmoji isVisible={showSadEmoji} />
      </div>

      <Header
        score={score}
        timeLeft={timeLeft}
        isPaused={isPaused}
        onPause={handlePause}
        onResume={handleResume}
        onHome={handleHome}
        formatTime={formatTime}
      />

      <div className="p-4 pt-20 max-w-2xl mx-auto relative">
        <CityImage
          imageUrl={gameState.currentImage}
          isAnswered={gameState.isAnswered}
        />
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl">
          <p className="text-lg text-primary-font-1">
            {gameState.currentQuestion}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {gameState.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => checkIfOptionIsCorrect(option)}
              disabled={gameState.isAnswered || isPaused}
              className={`p-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${getOptionClassName(
                option
              )}`}
            >
              {renderOptionContent(option)}
            </Button>
          ))}
        </div>
      </div>

      <Timer timeLeft={timeLeft} totalTime={GAME_DURATION} />
    </>
  );
};

export default Game;
