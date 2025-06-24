import axios from 'axios';

const API_URL = '/api/quiz';

// Fetch all quizzes
export const fetchQuizzes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a single quiz by ID
export const fetchQuizById = async (quizId) => {
  const response = await axios.get(`${API_URL}/${quizId}`);
  return response.data;
};

// Submit quiz answers
export const submitQuizAnswers = async (quizId, answers) => {
  const response = await axios.post(`${API_URL}/${quizId}/submit`, answers);
  return response.data;
};