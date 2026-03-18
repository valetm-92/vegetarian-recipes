import axios from 'axios';

const API_KEY = '2218f30a4d7e4bd3819830aa31dae862';
const BASE_URL = 'https://api.spoonacular.com';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const searchRecipes = async (query, number = 12) => {
  const response = await api.get('/recipes/complexSearch', {
    params: {
      query,
      diet: 'vegetarian',
      number,
      addRecipeInformation: true,
    },
  });
  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await api.get(`/recipes/${id}/information`, {
    params: {
      includeNutrition: true,
    },
  });
  return response.data;
};
