'use client';

import React from 'react';

interface LeaderboardEntry {
  username: string;
  highestScore: number;
  recentScore: number;
  lastPlayed: string;
}

interface LeaderboardTableProps {
  leaderboard: LeaderboardEntry[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ leaderboard }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-primary-orange-1 text-white font-semibold">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-4">Player</div>
        <div className="col-span-3 text-center">Highest Score</div>
        <div className="col-span-4 text-center">Last Played</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {leaderboard?.map((entry, index) => (
          <div
            key={entry.username}
            className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
          >
            <div className="col-span-1 text-center font-semibold text-primary-orange-1">
              {index + 1}
            </div>
            <div className="col-span-4 font-medium text-primary-font-1">
              {entry.username}
            </div>
            <div className="col-span-3 text-center text-primary-font-1">
              {entry.highestScore}
            </div>
            <div className="col-span-4 text-center text-gray-500 text-sm">
              {new Date(entry.lastPlayed).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardTable; 