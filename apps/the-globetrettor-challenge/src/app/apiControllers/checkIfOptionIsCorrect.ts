import { questionTokenManager } from './helpers/questionTokenManager';
import data from './mock.json';

export const checkIfOptionIsCorrect = async ({
  payload,
}: {
  payload: {
    option: string;
    token: string;
  };
}) => {
  try {
    const { option, token } = payload;

    const questionIndex = questionTokenManager.getQuestionIndex(token);
    if (questionIndex === null) {
      throw new Error('Invalid or expired question token');
    }

    const cityData = data[questionIndex];
    if (!cityData) {
      throw new Error('Question not found');
    }

    const correctAnswer = cityData.city;
    const isCorrect = option === correctAnswer;

    questionTokenManager.removeToken(token);

    return {
      isCorrect,
      correctAnswer: isCorrect ? correctAnswer : null,
    };
  } catch (error) {
    console.error('CheckIfOptionIsCorrect Error:', error);
    throw error;
  }
};
