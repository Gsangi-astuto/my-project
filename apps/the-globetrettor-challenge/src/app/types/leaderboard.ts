export interface UserScore {
  username: string;
  highestScore: number;
  recentScore: number;
  currentScore: number;
  lastPlayed: Date;
}

export interface LeaderboardEntry extends UserScore {
  rank?: number;
} 