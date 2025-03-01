const UNSPLASH_ACCESS_KEY = 'ooeKP4JHOzdV7tUP2JOSzwExi21dcMnLHGPfORDSEYA';
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

export const imageController = {
  getCityImage: async ({ payload }: { payload: { city: string; country: string } }) => {
    try {
      const query = `${payload.city} ${payload.country} landmarks cityscape`;
      const response = await fetch(
        `${UNSPLASH_API_URL}?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
        {
          headers: {
            'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            'Accept-Version': 'v1',
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch image');
      const data = await response.json();

      if (!data.results?.length) {
        const fallbackResponse = await fetch(
          `${UNSPLASH_API_URL}?query=${encodeURIComponent(payload.city)}&per_page=1&orientation=landscape`,
          {
            headers: {
              'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
              'Accept-Version': 'v1',
            },
          }
        );
        
        if (!fallbackResponse.ok) throw new Error('Failed to fetch fallback image');
        const fallbackData = await fallbackResponse.json();
        return {
          imageUrl: fallbackData.results[0]?.urls.regular || null,
        };
      }

      return {
        imageUrl: data.results[0]?.urls.regular || null,
      };
    } catch (error) {
      console.error('Error fetching image:', error);
      return { imageUrl: null };
    }
  },
}; 