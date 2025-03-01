'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import LeaderboardTable from './components/LeaderboardTable';
import ActionButtons from './components/ActionButtons';
import Header from './components/Header';

interface LeaderboardEntry {
  username: string;
  highestScore: number;
  recentScore: number;
  lastPlayed: string;
}

const Leaderboard = () => {
  const router = useRouter();

  const { data: leaderboard, isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const response = await fetch('/api/getLeaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/api/getLeaderboard' }),
      });
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      return response.json();
    },
  });

  const handleBack = () => router.push('/');
  const handlePlayAgain = () => {
    router.replace('/game');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary-bg-1">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-orange-1 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg-1 p-4">
      <Header title="Leaderboard" />

      {/* Content */}
      <div className="max-w-2xl mx-auto pt-24">
        <LeaderboardTable leaderboard={leaderboard || []} />
        <ActionButtons onBack={handleBack} onPlayAgain={handlePlayAgain} />
      </div>
    </div>
  );
};

export default Leaderboard;
