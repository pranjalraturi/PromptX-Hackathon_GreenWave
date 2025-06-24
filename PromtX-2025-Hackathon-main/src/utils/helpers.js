// This file exports helper functions for various utility tasks.

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(2);
};

export const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};