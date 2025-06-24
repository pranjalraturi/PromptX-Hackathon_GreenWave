import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/eco-action';

// Function to get all eco actions
export const getEcoActions = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Function to get a single eco action by ID
export const getEcoActionById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Function to create a new eco action
export const createEcoAction = async (actionData) => {
  const response = await axios.post(`${API_URL}`, actionData);
  return response.data;
};

// Function to update an eco action
export const updateEcoAction = async (id, actionData) => {
  const response = await axios.put(`${API_URL}/${id}`, actionData);
  return response.data;
};

// Function to delete an eco action
export const deleteEcoAction = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};