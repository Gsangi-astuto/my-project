'use client';

import React from 'react';
import Logo from '@libs/static/Logo';
import Button from '../../components/Button/Button';

interface HeaderProps {
  score: number;
  timeLeft: number;
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onHome: () => void;
  formatTime: (seconds: number) => string;
}

const Header: React.FC<HeaderProps> = ({
  score,
  timeLeft,
  isPaused,
  onPause,
  onResume,
  onHome,
  formatTime,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-primary-bg-1 shadow-lg z-40">
      <div className="max-w-2xl mx-auto flex items-center justify-between py-2 px-4">
        <div className="text-lg font-semibold text-primary-font-1">
          Score: {score}
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`text-lg font-semibold transition-all duration-300 ${
              timeLeft <= 10
                ? 'text-red-500 animate-pulse scale-110'
                : 'text-primary-font-1'
            }`}
          >
            {formatTime(timeLeft)}
          </div>
          <Button
            onClick={isPaused ? onResume : onPause}
            className="px-4 py-2 bg-primary-orange-1 hover:bg-primary-orange-2 text-primary-font-1 transform hover:scale-105 transition-all duration-200"
          >
            {isPaused ? (
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Resume
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                Pause
              </span>
            )}
          </Button>
          {isPaused && (
            <Button
              onClick={onHome}
              className="bg-primary-orange-1 hover:bg-primary-orange-2 text-primary-font-1 transform hover:scale-105 transition-transform duration-200 px-4 py-2"
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
