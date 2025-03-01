import { UserScore } from '../types/leaderboard';

const leaderboardStore = new Map<string, UserScore>();

export const leaderboardController = {
  updateScore: async ({ payload }: { payload: UserScore }) => {
    try {
      const existingUser = leaderboardStore.get(payload.username);

      const updatedScore = {
        ...payload,
        highestScore: existingUser
          ? Math.max(existingUser.highestScore, payload.currentScore)
          : payload.currentScore,
        recentScore: existingUser?.currentScore || 0,
        lastPlayed: new Date(),
      };

      leaderboardStore.set(payload.username, updatedScore);
      return updatedScore;
    } catch (error) {
      console.error('Error updating score:', error);
      throw error;
    }
  },

  getLeaderboard: async () => {
    try {
      const entries = Array.from(leaderboardStore.values());

      const sortedEntries = entries
        .sort((a, b) => b.highestScore - a.highestScore)
        .map((entry, index) => ({
          ...entry,
          rank: index + 1,
        }));

      return sortedEntries;
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      throw error;
    }
  },

  getUserScore: async (username: string) => {
    return leaderboardStore.get(username) || null;
  },
};
