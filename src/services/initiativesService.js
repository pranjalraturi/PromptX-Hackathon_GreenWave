import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/initiatives';

// Get all initiatives
export const getInitiatives = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get initiative by ID
export const getInitiativeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new initiative
export const createInitiative = async (initiativeData) => {
  const response = await axios.post(API_URL, initiativeData);
  return response.data;
};

// Update an existing initiative
export const updateInitiative = async (id, initiativeData) => {
  const response = await axios.put(`${API_URL}/${id}`, initiativeData);
  return response.data;
};

// Delete an initiative
export const deleteInitiative = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};