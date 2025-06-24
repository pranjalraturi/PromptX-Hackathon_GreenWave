import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaArrowRight } from 'react-icons/fa';

const ActionCard = ({ action }) => {
  // Destructure action properties with defaults
  const { 
    title = "Eco Action", 
    description = "Take this action to help the environment",
    impactPoints = 10,
    difficulty = "Easy",
    category = "General",
    onClick = () => console.log("Action clicked"),
    icon = <FaLeaf />
  } = action;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-2"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 mr-3 text-white bg-green-600 rounded-full">
              {icon}
            </div>
            <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
              {category}
            </span>
          </div>
          <span className="px-3 py-1 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-green-500 to-green-600">
            +{impactPoints} pts
          </span>
        </div>
        
        <h3 className="mb-2 text-xl font-bold text-gray-800">{title}</h3>
        
        <p className="mb-5 text-gray-600">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Difficulty: <span className="font-medium">{difficulty}</span>
          </span>
          
          <motion.button 
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors duration-300 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            Take Action
            <FaArrowRight className="ml-2" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActionCard;