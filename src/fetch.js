import axios from 'axios';

const API_KEY = '33677208-f1f2404fc2dd629d3112c23cb';
const BASE_URL = 'https://pixabay.com/api/';
const imageLimit = 40;

export const searchImages = async (searchQuery, page) => {
    
    try {
      const response = await axios.get(`${BASE_URL}`, {
        params: {
          key: API_KEY,
          q: searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: imageLimit,
          page: page,
        },
      });
  
      const images = response.data.hits;
      return images;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  };