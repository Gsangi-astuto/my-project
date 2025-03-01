import { randomBytes } from 'crypto';

const questionTokenStore = new Map<
  string,
  {
    questionIndex: number;
    expiresAt: number;
  }
>();

export const questionTokenManager = {
  createToken: (questionIndex: number) => {
    const token = randomBytes(32).toString('hex');
    questionTokenStore.set(token, {
      questionIndex,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });
    return token;
  },

  getQuestionIndex: (token: string) => {
    const question = questionTokenStore.get(token);
    if (!question) return null;

    if (question.expiresAt < Date.now()) {
      questionTokenStore.delete(token);
      return null;
    }

    return question.questionIndex;
  },

  removeToken: (token: string) => {
    questionTokenStore.delete(token);
  },
};
