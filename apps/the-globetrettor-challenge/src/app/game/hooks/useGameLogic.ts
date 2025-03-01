import React, { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GameState, NewQuestionResponse } from '../types/types';
import { useUser } from '../contexts/UserContext';
import useConfetti from './useConfetti';
import { GAME_DURATION, CORRECT_ANSWER_DELAY } from '../constants';

export const useGameLogic = () => {
  const { username } = useUser();
  const [gameState, setGameState] = React.useState<GameState>({
    currentQuestion: null,
    options: [],
    usedQuestions: new Set<number>(),
    isAnswered: false,
    currentQuestionToken: null,
    correctAnswer: null,
    selectedAnswer: null,
    currentImage: null,
  });

  const [score, setScore] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(GAME_DURATION);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const { triggerConfetti, isConfettiActive, ConfettiComponent } =
    useConfetti();
  const [showSadEmoji, setShowSadEmoji] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  const showSadEmojiTemporarily = () => {
    setShowSadEmoji(true);
    setTimeout(() => setShowSadEmoji(false), 1000);
  };

  const getNewQuestion = async (): Promise<NewQuestionResponse> => {
    const response = await fetch('/api/getNewQuestion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: '/api/getNewQuestion',
        payload: Array.from(gameState.usedQuestions),
      }),
    });

    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const {
    data: newQuestion,
    isLoading,
    error,
  } = useQuery<NewQuestionResponse>({
    queryKey: ['newQuestion', Array.from(gameState.usedQuestions)],
    queryFn: getNewQuestion,
    retry: 2,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  // Timer effect
  React.useEffect(() => {
    if (timeLeft > 0 && !isGameOver && !isPaused) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isGameOver) {
      setIsGameOver(true);
      handleGameOver();
    }
  }, [timeLeft, isGameOver, isPaused]);

  const handleGameOver = async () => {
    await updateLeaderboard(score);
  };

  React.useEffect(() => {
    if (newQuestion) {
      setGameState((prev) => ({
        ...prev,
        currentQuestion: newQuestion.question,
        options: newQuestion.options,
        currentQuestionToken: newQuestion.token,
        currentImage: newQuestion.imageUrl,
        correctAnswer: null,
        selectedAnswer: null,
      }));
    }
  }, [newQuestion]);

  const fetchNextQuestion = async () => {
    try {
      const response = await fetch('/api/getNewQuestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: '/api/getNewQuestion',
          payload: Array.from(gameState.usedQuestions),
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const newQuestion = await response.json();

      setGameState({
        currentQuestion: newQuestion.question,
        options: newQuestion.options,
        usedQuestions: gameState.usedQuestions,
        isAnswered: false,
        currentQuestionToken: newQuestion.token,
        currentImage: newQuestion.imageUrl,
        correctAnswer: null,
        selectedAnswer: null,
      });
    } catch (error) {
      console.error('Error fetching next question:', error);
    }
  };

  const updateLeaderboard = async (currentScore: number) => {
    try {
      if (!username) return;

      const response = await fetch('/api/updateScore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: '/api/updateScore',
          payload: {
            username,
            currentScore,
            highestScore: currentScore,
            recentScore: 0,
            lastPlayed: new Date(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update leaderboard');
      }
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    }
  };

  const checkIfOptionIsCorrect = async (option: string) => {
    if (gameState.isAnswered || !gameState.currentQuestionToken || isGameOver)
      return;

    try {
      const response = await fetch('/api/checkIfOptionIsCorrect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: '/api/checkIfOptionIsCorrect',
          payload: { option, token: gameState.currentQuestionToken },
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      if (result.error) throw new Error(result.error);

      const newScore = score + (result.isCorrect ? 1 : -0.25);
      setScore(newScore);

      setGameState((prev) => ({
        ...prev,
        isAnswered: true,
        correctAnswer: result.correctAnswer,
        selectedAnswer: option,
      }));

      if (result.isCorrect) {
        triggerConfetti();
        const newUsedQuestions = new Set(gameState.usedQuestions);
        const questionIndex = Number(
          gameState.currentQuestionToken?.split('-')[0]
        );
        newUsedQuestions.add(questionIndex);
        gameState.usedQuestions = newUsedQuestions;

        await new Promise((resolve) =>
          setTimeout(resolve, CORRECT_ANSWER_DELAY)
        );
      } else {
        showSadEmojiTemporarily();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      await updateLeaderboard(newScore);

      await fetchNextQuestion();
    } catch (error) {
      console.error('Error checking answer:', error);
      setGameState((prev) => ({
        ...prev,
        isAnswered: true,
        currentQuestionToken: null,
      }));
    }
  };

  const resetGame = useCallback(() => {
    setGameState({
      currentQuestion: null,
      options: [],
      usedQuestions: new Set<number>(),
      isAnswered: false,
      currentQuestionToken: null,
      correctAnswer: null,
      selectedAnswer: null,
      currentImage: null,
    });
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setIsGameOver(false);
    setShowSadEmoji(false);
  }, []);

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  return {
    gameState,
    score,
    isLoading,
    error,
    checkIfOptionIsCorrect,
    timeLeft,
    isGameOver,
    showSadEmoji,
    isConfettiActive,
    ConfettiComponent,
    resetGame,
    isPaused,
    handlePause,
    handleResume,
  };
};
