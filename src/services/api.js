import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

// Example API call functions
export const fetchQuizzes = async () => {
  const response = await api.get('/quiz');
  return response.data;
};

export const fetchRewards = async () => {
  const response = await api.get('/rewards');
  return response.data;
};

export const fetchEcoActions = async () => {
  const response = await api.get('/eco-action');
  return response.data;
};

export const fetchInitiatives = async () => {
  const response = await api.get('/initiatives');
  return response.data;
};