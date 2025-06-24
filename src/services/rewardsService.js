import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/rewards';

// Get all rewards
export const getRewards = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a single reward by ID
export const getRewardById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new reward
export const createReward = async (rewardData) => {
  const response = await axios.post(API_URL, rewardData);
  return response.data;
};

// Update an existing reward
export const updateReward = async (id, rewardData) => {
  const response = await axios.put(`${API_URL}/${id}`, rewardData);
  return response.data;
};

// Delete a reward
export const deleteReward = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};