import axios from 'axios';

// Create an instance of Axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the authorization header with the token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// User Authentication APIs
export const registerUser = (userData) => {
  return api.post('/api/register', userData);
};

export const loginUser = (userData) => {
  return api.post('/api/login', userData);
};

// Ingredient Management APIs
export const getIngredients = () => {
  return api.get('/api/ingredients');
};

export const addIngredient = (ingredientData) => {
  return api.post('/api/ingredients', ingredientData);
};

export const updateIngredient = (id, ingredientData) => {
  return api.put(`/api/ingredients/${id}`, ingredientData);
};

export const deleteIngredient = (id) => {
  return api.delete(`/api/ingredients/${id}`);
};

// Recipe Suggestion API
export const getRecipeSuggestions = (ingredients) => {
  return api.post('/api/suggest-recipes', { ingredients });
};

export default api;
