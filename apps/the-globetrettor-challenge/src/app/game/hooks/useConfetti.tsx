import React from 'react';
import { useState, useCallback } from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const useConfetti = () => {
  const { width, height } = useWindowSize();
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const triggerConfetti = useCallback(() => {
    setIsConfettiActive(true);
    setTimeout(() => setIsConfettiActive(false), 1500);
  }, []);

  const ConfettiComponent = isConfettiActive ? (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <ReactConfetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        gravity={0.2}
        tweenDuration={1000}
        colors={['#FFD700', '#FFA500', '#FF69B4', '#00FF00', '#4169E1']}
      />
    </div>
  ) : null;

  return { ConfettiComponent, triggerConfetti, isConfettiActive };
};

export default useConfetti; 