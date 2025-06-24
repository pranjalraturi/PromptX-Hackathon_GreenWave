import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaLeaf, FaSlidersH, FaSeedling, FaTree, FaRecycle } from 'react-icons/fa';
import ActionCard from '../../components/eco-actions/ActionCard';

const ActionList = ({ actions = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = ['All', 'Transportation', 'Energy', 'Waste', 'Conservation', 'Food', 'General'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  
  // Filter actions based on search term and filters
  const filteredActions = actions.filter(action => {
    const matchesSearch = action.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || action.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || action.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  
  // Sample data if no actions are provided
  const displayActions = filteredActions.length > 0 ? filteredActions : [
    {
      id: 1,
      title: "Plant a Tree",
      description: "Help combat climate change by planting a tree in your community.",
      impactPoints: 25,
      difficulty: "Medium",
      category: "Conservation"
    },
    {
      id: 2,
      title: "Reduce Plastic Use",
      description: "Eliminate single-use plastics from your daily routine.",
      impactPoints: 15,
      difficulty: "Easy",
      category: "Waste"
    },
    {
      id: 3,
      title: "Community Cleanup",
      description: "Organize or join a local cleanup effort in your neighborhood.",
      impactPoints: 30,
      difficulty: "Medium",
      category: "Conservation"
    }
  ];

  return (
    <div className="relative min-h-screen pb-16 overflow-hidden bg-gradient-to-b from-green-50 to-green-100">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 transform translate-x-1/4 -translate-y-1/4 opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#046307" d="M43.2,-62.5C55.8,-53.7,65.8,-41.3,70.8,-27.2C75.8,-13.1,75.8,2.6,71.4,16.5C67,30.3,58.1,42.2,46.5,52.5C34.8,62.7,20.3,71.3,3.4,68.5C-13.6,65.8,-34,51.7,-46.5,36.5C-59,21.3,-63.4,5,-61.4,-10.1C-59.3,-25.2,-50.7,-39.1,-39.2,-48.3C-27.7,-57.5,-13.9,-62,-0.5,-61.2C12.9,-60.4,30.7,-71.3,43.2,-62.5Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 transform w-80 h-80 -translate-x-1/3 translate-y-1/3 opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#046307" d="M57.6,-48.9C72.1,-36.1,80,-11.9,75.1,7.2C70.3,26.3,52.6,40.2,33.5,51C14.3,61.8,-6.4,69.5,-25.4,65.2C-44.4,60.9,-61.8,44.7,-67.3,25.7C-72.8,6.8,-66.5,-14.8,-54.6,-29.4C-42.7,-44.1,-25.4,-51.7,-7.3,-46.7C10.8,-41.8,43.2,-61.6,57.6,-48.9Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 right-0 text-green-900 transform opacity-5 translate-x-1/4 translate-y-1/4">
        <FaTree className="w-64 h-64" />
      </div>

      <div className="absolute text-green-900 transform -translate-y-1/2 top-1/4 left-10 opacity-5">
        <FaLeaf className="w-32 h-32" />
      </div>
      
      {/* Main content */}
      <div className="relative px-4 py-12 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-white bg-green-600 rounded-full">
            <FaSeedling className="w-8 h-8" />
          </div>
          <h1 className="mb-3 text-4xl font-bold text-gray-800">Eco Actions</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Discover actions you can take to create a positive environmental impact and earn rewards
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="sticky top-0 z-10 p-5 mb-10 overflow-hidden bg-white shadow-xl rounded-2xl backdrop-blur-sm bg-opacity-90"
        >
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-green-500" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for eco actions..."
                className="w-full py-3 pl-10 pr-4 text-gray-700 border-0 rounded-lg shadow-inner bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 font-medium text-green-700 transition-colors duration-300 rounded-lg bg-green-50 hover:bg-green-100"
            >
              <FaSlidersH className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            <div className="px-3 py-1 text-sm font-medium text-white rounded-full bg-gradient-to-r from-green-500 to-green-600">
              {displayActions.length} actions available
            </div>
          </div>
          
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 mt-4 border border-green-200 border-dashed rounded-lg bg-green-50"
            >
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center mr-2">
                  <FaFilter className="mr-2 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[180px]">
                    <label className="block mb-1 text-xs font-medium text-gray-500">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border-0 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex-1 min-w-[180px]">
                    <label className="block mb-1 text-xs font-medium text-gray-500">Difficulty</label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border-0 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {difficulties.map(difficulty => (
                        <option key={difficulty} value={difficulty}>
                          {difficulty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
        
        {displayActions.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayActions.map((action, index) => (
                <motion.div
                  key={action.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="h-full"
                >
                  <ActionCard action={action} />
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center mt-12"
            >
              <button className="px-6 py-3 font-medium text-white transition-colors duration-300 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                Load More Actions
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-8 py-16 text-center bg-white shadow-lg rounded-2xl"
          >
            <div className="flex justify-center mb-6">
              <div className="p-6 text-green-200 rounded-full bg-green-50">
                <FaRecycle className="w-16 h-16" />
              </div>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-700">No actions found</h3>
            <p className="max-w-md mx-auto mb-8 text-gray-500">
              Try adjusting your search or filters to find eco actions that match your interests.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
              className="px-6 py-3 font-medium text-white transition-colors duration-300 rounded-full shadow-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ActionList;