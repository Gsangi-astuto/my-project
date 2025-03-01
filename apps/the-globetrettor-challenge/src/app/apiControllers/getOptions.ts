import { fisherYatesShuffle } from './helpers/fisherYatesShuffle';
import data from './mock.json';
import { City } from './types/types';

export const getOptions = async ({
  payload,
}: {
  payload: { city: string };
}) => {
  try {
    const { city } = payload;
    const cities = (data as City[]).map((item) => item.city);
    const options = new Set<string>([city]);

    console.log('Generating options for city:', city);

    while (options.size < 4) {
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      if (randomCity !== city) {
        options.add(randomCity);
      }
    }

    return fisherYatesShuffle(options);
  } catch (error) {
    console.error('GetOptions Error:', error);
    throw error;
  }
};
