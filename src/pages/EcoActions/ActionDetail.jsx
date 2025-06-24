import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaLeaf, FaUserFriends, FaClock, FaTrophy, FaMapMarkerAlt, 
  FaArrowLeft, FaCheckCircle, FaShare, FaBookmark, FaStar
} from 'react-icons/fa';

const ActionDetail = ({ action }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Default values for the action if not provided
  const {
    id = "1",
    title = "Plant a Native Tree in Your Community",
    description = "Trees absorb CO2, a greenhouse gas that contributes to climate change. By planting native trees, you're not only reducing carbon emissions but also providing habitat for local wildlife, improving air quality, and enhancing your community's green space.",
    impactPoints = 125,
    difficulty = "Medium",
    category = "Conservation",
    duration = "2-3 hours",
    completions = 1245,
    location = "Outdoors - Local Community",
    completionRate = 87,
    steps = [
      "Research native tree species that thrive in your local climate and soil conditions",
      "Purchase a young tree from a local nursery or get one from a community tree-planting program",
      "Choose an appropriate planting location that provides enough space for the tree to mature",
      "Dig a hole twice as wide as the root ball and at equal depth",
      "Place the tree in the hole, making sure it's straight and at the proper height",
      "Backfill with soil, tamp down to remove air pockets, and water thoroughly",
      "Add mulch around the base (but not touching the trunk) to retain moisture",
      "Stake the tree if necessary for support during its first year"
    ],
    tips = [
      "Water your newly planted tree regularly for the first two years, especially during dry periods",
      "Take before and after photos to document your impact and inspire others",
      "Engage neighbors or friends to help with the planting for a community building experience",
      "Register your tree with local tree-planting initiatives to contribute to broader environmental goals"
    ],
    materials = [
      "Young native tree",
      "Shovel or spade",
      "Garden gloves",
      "Watering can or hose",
      "Mulch",
      "Stakes and ties (optional)"
    ],
    benefits = [
      "A single mature tree can absorb up to 48 pounds of CO2 per year",
      "Trees provide habitat for birds and wildlife",
      "Improves local air quality and reduces urban heat island effect",
      "Enhances property values and community aesthetics"
    ],
    image = "https://images.unsplash.com/photo-1513764464095-8e91e0b23d25?q=80&w=2070&auto=format&fit=crop"
  } = action || {};

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-b from-green-50 to-green-100">
      {/* Decorative background elements */}
      <div className="absolute right-0 top-20 -z-10 opacity-10">
        <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
          <defs>
            <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="4" className="text-green-800" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#pattern-circles)" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 -z-10 opacity-10">
        <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
          <defs>
            <pattern id="pattern-squares" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="8" y="8" width="4" height="4" className="text-green-800" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#pattern-squares)" />
        </svg>
      </div>
      
      <div className="container max-w-5xl px-4 py-8 mx-auto">
        {/* Back to actions link */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/actions" className="inline-flex items-center mb-6 text-sm font-medium text-green-700 hover:text-green-800">
            <FaArrowLeft className="mr-2" />
            Back to Eco Actions
          </Link>
        </motion.div>
        
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden bg-white shadow-xl rounded-3xl"
        >
          <div className="relative overflow-hidden h-80 sm:h-96">
            <img 
              src={image} 
              alt={title} 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            
            <div className="absolute flex space-x-2 top-4 right-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="flex items-center justify-center w-10 h-10 text-white transition-all duration-200 bg-white rounded-full bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30"
              >
                <FaBookmark className={isBookmarked ? "text-yellow-400" : ""} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-10 h-10 text-white transition-all duration-200 bg-white rounded-full bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30"
              >
                <FaShare />
              </motion.button>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-0 left-0 w-full p-6 text-white sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-medium bg-green-600 rounded-full">
                  {category}
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-green-700 rounded-full">
                  {difficulty}
                </span>
                <span className="flex items-center px-3 py-1 text-xs font-medium bg-green-800 rounded-full">
                  <FaTrophy className="mr-1" /> {impactPoints} points
                </span>
              </div>
              <h1 className="mb-2 text-3xl font-bold sm:text-4xl text-shadow">{title}</h1>
              
              <div className="flex items-center text-green-300">
                <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2 bg-opacity-50">
                  <div className="bg-green-400 h-2.5 rounded-full" style={{ width: `${completionRate}%` }}></div>
                </div>
                <span className="text-sm whitespace-nowrap">{completionRate}% completion rate</span>
              </div>
            </motion.div>
          </div>
          
          {/* Action stats */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex items-center p-4 border border-green-100 bg-green-50 rounded-xl"
              >
                <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-100 rounded-full">
                  <FaTrophy className="text-2xl text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Impact Points</p>
                  <p className="text-xl font-bold text-gray-800">+{impactPoints}</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center p-4 border border-green-100 bg-green-50 rounded-xl"
              >
                <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-100 rounded-full">
                  <FaClock className="text-2xl text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="text-xl font-bold text-gray-800">{duration}</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex items-center p-4 border border-green-100 bg-green-50 rounded-xl"
              >
                <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-100 rounded-full">
                  <FaUserFriends className="text-2xl text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completions</p>
                  <p className="text-xl font-bold text-gray-800">{completions.toLocaleString()}</p>
                </div>
              </motion.div>
            </div>
            
            {/* Description */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 mr-3 bg-green-600 rounded-full">
                  <FaLeaf className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">About This Action</h2>
              </div>
              
              <p className="mb-6 leading-relaxed text-gray-700">{description}</p>
              
              <div className="flex items-center mt-4 text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-green-600" />
                <span>{location}</span>
              </div>
            </motion.div>
            
            {/* Materials needed */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="p-6 mb-8 border border-green-200 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl"
            >
              <h3 className="mb-4 text-xl font-bold text-gray-800">Materials You'll Need</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {materials.map((material, index) => (
                  <div key={index} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-8 h-8 mr-3 bg-green-100 rounded-full">
                      <span className="text-sm font-bold text-green-700">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{material}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Steps */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 mr-3 bg-green-600 rounded-full">
                  <FaCheckCircle className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">How To Complete</h2>
              </div>
              
              <div className="relative pl-8 border-l-2 border-green-200">
                {steps.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className="relative mb-8"
                  >
                    <div className="absolute -left-[41px] flex items-center justify-center w-16 h-16 rounded-full bg-green-100 border-4 border-white">
                      <span className="text-xl font-bold text-green-700">{index + 1}</span>
                    </div>
                    <div className="pt-2 ml-6">
                      <p className="mb-2 text-lg font-medium text-gray-800">Step {index + 1}</p>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Benefits */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="p-6 mb-8 bg-white border border-green-100 shadow-md rounded-2xl"
            >
              <h3 className="mb-4 text-xl font-bold text-gray-800">Environmental Benefits</h3>
              
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FaStar className="text-yellow-400" />
                    </div>
                    <p className="ml-3 text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Tips */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 mr-3 bg-green-600 rounded-full">
                  <FaLeaf className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Tips for Success</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start p-4 border border-green-100 bg-green-50 rounded-xl">
                    <div className="flex-shrink-0 mt-1">
                      <FaLeaf className="text-green-600" />
                    </div>
                    <p className="ml-3 text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center flex-1 px-6 py-4 text-lg font-bold text-white transition-colors duration-300 shadow-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl"
              >
                Start This Action
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center flex-1 px-6 py-4 text-lg font-bold text-green-600 transition-colors duration-300 border-2 border-green-500 sm:flex-none hover:bg-green-50 rounded-xl"
              >
                Save For Later
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ActionDetail;