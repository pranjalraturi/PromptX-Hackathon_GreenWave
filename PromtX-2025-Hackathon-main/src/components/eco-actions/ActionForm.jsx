import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaEdit, FaPaperPlane } from 'react-icons/fa';

const ActionForm = () => {
  const [actionName, setActionName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [difficulty, setDifficulty] = useState('Easy');
  const [impactPoints, setImpactPoints] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle form submission logic here
      console.log('Action submitted:', { 
        actionName, 
        description,
        category,
        difficulty,
        impactPoints
      });
      
      // Optional: Reset form after submission
      // setActionName('');
      // setDescription('');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-white shadow-lg rounded-2xl"
    >
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center w-10 h-10 mr-3 text-white bg-green-600 rounded-full">
          <FaLeaf />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Create New Eco Action</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="actionName" className="block mb-1 text-sm font-medium text-gray-700">
              Action Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEdit className="text-gray-400" />
              </div>
              <input
                type="text"
                id="actionName"
                value={actionName}
                onChange={(e) => setActionName(e.target.value)}
                required
                placeholder="Plant a tree"
                className="block w-full py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="General">General</option>
              <option value="Transportation">Transportation</option>
              <option value="Energy">Energy</option>
              <option value="Waste">Waste</option>
              <option value="Conservation">Conservation</option>
              <option value="Food">Food</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="difficulty" className="block mb-1 text-sm font-medium text-gray-700">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="impactPoints" className="block mb-1 text-sm font-medium text-gray-700">
                Impact Points
              </label>
              <input
                type="number"
                id="impactPoints"
                min="1"
                max="100"
                value={impactPoints}
                onChange={(e) => setImpactPoints(parseInt(e.target.value))}
                className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe the eco action and its benefits..."
              rows="4"
              className="block w-full px-4 py-3 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
        
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center w-full px-6 py-3 text-lg font-medium text-white transition-colors duration-300 border border-transparent rounded-lg shadow-sm bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70"
        >
          {isLoading ? (
            <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <FaPaperPlane className="mr-2" /> Submit Action
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ActionForm;