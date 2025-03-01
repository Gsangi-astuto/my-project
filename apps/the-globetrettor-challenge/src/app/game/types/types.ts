export interface City {
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
}

export interface GameState {
  currentQuestion: string[] | null;
  options: string[];
  usedQuestions: Set<number>;
  isAnswered: boolean;
  currentQuestionToken: string | null;
  correctAnswer: string | null;
  selectedAnswer: string | null;
  currentImage: string | null;
}

export type NewQuestionResponse = {
  question: string[];
  funFact: string[];
  trivia: string[];
  options: string[];
  token: string;
  imageUrl: string | null;
};
