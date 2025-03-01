'use client';

import Button from '../components/Button/Button';
import { useRouter } from 'next/navigation';
import { useUser } from '../game/contexts/UserContext';
import { useState } from 'react';
import Logo from '@libs/static/Logo';

const Start = () => {
  const router = useRouter();
  const { setUsername } = useUser();
  const [inputUsername, setInputUsername] = useState('');
  const [error, setError] = useState('');

  const handleStartGame = () => {
    if (!inputUsername.trim()) {
      setError('Please enter a username');
      return;
    }
    setUsername(inputUsername);
    router.push('/game');
  };

  const handleChallengeFriend = () => {
    router.push('/challengeAFriend');
  };

  const handleLeaderBoard = () => {
    router.push('/leaderboard');
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <Logo />
      <div className="w-full max-w-xs">
        <input
          type="text"
          value={inputUsername}
          onChange={(e) => {
            setInputUsername(e.target.value);
            setError('');
          }}
          placeholder="Enter your username"
          className="w-full p-2 border-1.5 rounded mb-2 border-primary-input-border-1"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      </div>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button onClick={handleStartGame}>Start Game</Button>
        <Button onClick={handleLeaderBoard}>LeaderBoard</Button>
      </div>
    </div>
  );
};

export default Start;
