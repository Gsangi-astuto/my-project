'use client';

import React from 'react';
import Button from '../../components/Button/Button';

interface ActionButtonsProps {
  onBack: () => void;
  onPlayAgain: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onBack, onPlayAgain }) => {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <Button
        onClick={onBack}
        className="bg-gray-500 hover:bg-gray-600 text-white transform hover:scale-105 transition-transform duration-200"
      >
        Back to Home
      </Button>
      <Button
        onClick={onPlayAgain}
        className="bg-primary-orange-1 hover:bg-primary-orange-2 text-primary-font-1 transform hover:scale-105 transition-transform duration-200"
      >
        Play Again
      </Button>
    </div>
  );
};

export default ActionButtons; 