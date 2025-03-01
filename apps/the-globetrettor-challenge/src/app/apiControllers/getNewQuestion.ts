import { City } from './types/types';
import data from './mock.json';
import { getOptions } from './getOptions';
import { questionTokenManager } from './helpers/questionTokenManager';
import { imageController } from './imageController';

export const getNewQuestion = async ({ payload }: { payload: number[] }) => {
  try {
    const usedQuestions = new Set(payload);
    const availableCities = data as City[];

    const getRandomCity = (): number => {
      let randomIndex: number;
      do {
        randomIndex = Math.floor(Math.random() * availableCities.length);
      } while (usedQuestions.has(randomIndex));
      return randomIndex;
    };

    const newQuestionIndex = getRandomCity();
    const selectedCity = availableCities[newQuestionIndex];

    if (!selectedCity) {
      throw new Error('No available cities');
    }

    const questionToken = questionTokenManager.createToken(newQuestionIndex);
    const options = await getOptions({ payload: { city: selectedCity.city } });

    const { imageUrl } = await imageController.getCityImage({
      payload: {
        city: selectedCity.city,
        country: selectedCity.country,
      },
    });

    return {
      token: questionToken,
      question: selectedCity.clues,
      funFact: selectedCity.fun_fact,
      trivia: selectedCity.trivia,
      options: options,
      imageUrl,
    };
  } catch (error) {
    console.error('GetNewQuestion Error:', error);
    throw error;
  }
};
