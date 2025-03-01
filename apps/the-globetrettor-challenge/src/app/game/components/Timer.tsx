'use client';

import React from 'react';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime }) => {
  const percentage = (timeLeft / totalTime) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 rounded-full ${
              timeLeft <= 10 ? 'bg-red-500' : 'bg-primary-orange-1'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Timer; 