import React from 'react';

interface SadEmojiProps {
  isVisible: boolean;
}

const SadEmoji: React.FC<SadEmojiProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-8xl animate-bounce bg-white rounded-full p-4 shadow-lg">
        😢
      </div>
    </div>
  );
};

export default SadEmoji; 