import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, FaBrain, FaBookOpen, FaClock, FaMedal, 
  FaChartLine, FaUsers, FaCheckCircle, FaStar, FaLightbulb
} from 'react-icons/fa';

const QuizDetail = ({ quiz }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Default values for the quiz if not provided
  const {
    id = "1",
    title = "Carbon Footprint Survey",
    description = "Discover your environmental impact with our comprehensive carbon footprint assessment. This survey helps you understand how your daily choices affect your carbon emissions and provides insights on how to reduce your ecological footprint.",
    category = "Sustainability",
    difficulty = "Beginner",
    questions = 20,  // Updated to match the number of carbon footprint questions
    timeEstimate = "10 min",
    completionRate = 82,
    points = 200,
    averageScore = 68,
    totalParticipants = 3241,
    topics = [
      "Home energy consumption",
      "Transportation habits",
      "Dietary choices",
      "Waste management",
      "Water usage",
      "Consumer habits"
    ],
    skillsGained = [
      "Understanding of personal carbon footprint contributors",
      "Ability to identify high-impact areas for emission reduction",
      "Knowledge of sustainable lifestyle alternatives",
      "Awareness of daily habits' environmental impact"
    ],
    previewQuestions = [
      {
        question: "Lights and fans – do they stay on when you leave the room?",
        options: ["I always switch them off!", "I forget sometimes.", "They stay on often."],
        answer: 0
      },
      {
        question: "How do you keep your home cool or warm most of the time?",
        options: ["Air Conditioner", "Fans", "I barely use anything."],
        answer: 1
      },
      {
        question: "Energy-efficient appliances: Are they part of your home?",
        options: ["Yes, always!", "Not really."],
        answer: 0
      },
      {
        question: "What's your usual ride on a weekday?",
        options: ["Car", "Bike", "Public transport", "I prefer walking or cycling."],
        answer: 3
      },
      {
        question: "How far do you typically drive in a week?",
        options: ["Less than 50 km", "50-200 km", "Over 200 km."],
        answer: 0
      },
      {
        question: "How many flights have you taken this year?",
        options: ["None", "1-2 flights", "3 or more."],
        answer: 0
      },
      {
        question: "What's your plate filled with most days?",
        options: ["Vegetarian meals", "Non-vegetarian meals", "A mix of both."],
        answer: 0
      },
      {
        question: "How often do you enjoy non-veg food?",
        options: ["Rarely", "1-3 times a week", "Almost daily", "I'm a vegetarian."],
        answer: 3
      },
      {
        question: "When it comes to fruits and veggies, what do you buy?",
        options: ["Mostly local produce", "A mix of local and imported", "Whatever looks good."],
        answer: 0
      },
      {
        question: "Do you recycle at home?",
        options: ["Yes, always!", "Sometimes.", "Rarely or never."],
        answer: 0
      },
      {
        question: "How much trash do you throw out in a week?",
        options: ["1 bag or less", "2-3 bags", "More than 3 bags."],
        answer: 0
      },
      {
        question: "Plastic and you – what's your take?",
        options: ["I avoid plastic as much as possible.", "I use it sometimes.", "I don't avoid it."],
        answer: 0
      },
      {
        question: "How long do your showers usually last?",
        options: ["5 minutes or less", "Around 10 minutes", "More than 10 minutes."],
        answer: 0
      },
      {
        question: "Do you turn off the tap while brushing your teeth?",
        options: ["Yes, always!", "I forget sometimes."],
        answer: 0
      },
      {
        question: "How often do you buy new clothes?",
        options: ["Rarely", "Every few months", "Often."],
        answer: 0
      },
      {
        question: "When something breaks, do you repair it or replace it?",
        options: ["I prefer repairing.", "Sometimes I repair, sometimes I replace.", "I usually replace it – no time to fix things!"],
        answer: 0
      },
      {
        question: "What kind of home do you live in?",
        options: ["Apartment", "Small house", "Large house."],
        answer: 0
      },
      {
        question: "Do you have a garden or plant trees at home?",
        options: ["Yes, I love gardening!", "No, I haven't had the chance yet."],
        answer: 0
      },
      {
        question: "Ever joined a tree-planting drive?",
        options: ["Yes, I have!", "Not yet, but maybe someday."],
        answer: 0
      },
      {
        question: "How do you usually wash your laundry?",
        options: ["Cold water", "Hot water."],
        answer: 0
      }
    ],
    image = "https://images.unsplash.com/photo-1569097387886-10d7a5d88a45?q=80&w=1470&auto=format&fit=crop"
  } = quiz || {};

  return (
    <div className="relative min-h-screen pb-16 overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-green-100 to-green-50 -z-10"></div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 -z-10">
        <svg width="100%" height="100%" className="absolute opacity-10">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#046307" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Animated light effects */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none particles">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-600 rounded-full opacity-20"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              scale: Math.random() * 0.5 + 0.5 
            }}
            animate={{ 
              x: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              y: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ]
            }}
            transition={{ 
              duration: 20 + Math.random() * 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </div>
      
      <div className="container relative max-w-5xl px-4 py-8 mx-auto">
        {/* Back navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/quizzes" className="inline-flex items-center mb-6 text-sm font-medium text-green-700 hover:text-green-800">
            <FaArrowLeft className="mr-2" />
            Back to Quizzes
          </Link>
        </motion.div>
        
        {/* Main content card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden bg-white border border-green-100 shadow-xl rounded-3xl"
        >
          {/* Hero section */}
          <div className="relative overflow-hidden h-80 sm:h-96">
            <img 
              src={image} 
              alt={title} 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-0 left-0 w-full p-6 text-white sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-green-500 to-green-600">
                  {category}
                </span>
                <span className="px-3 py-1 text-xs font-medium text-green-700 rounded-full bg-white/90">
                  {difficulty}
                </span>
                <span className="flex items-center px-3 py-1 text-xs font-medium bg-green-800 rounded-full">
                  <FaMedal className="mr-1" /> {points} points
                </span>
              </div>
              <h1 className="mb-2 text-3xl font-bold sm:text-4xl text-shadow">{title}</h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <FaBookOpen className="mr-1.5 text-green-300" />
                  <span>{questions} questions</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-1.5 text-green-300" />
                  <span>{timeEstimate}</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Quiz details */}
          <div className="p-6 sm:p-8">
            {/* Stats cards */}
            <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex items-center p-4 border border-green-100 bg-gradient-to-br from-green-50 to-green-100 rounded-xl"
              >
                <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-500 rounded-full">
                  <FaMedal className="text-2xl text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Points Available</p>
                  <p className="text-xl font-bold text-gray-800">+{points} pts</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center p-4 border border-green-100 bg-gradient-to-br from-green-50 to-green-100 rounded-xl"
              >
                <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-500 rounded-full">
                  <FaChartLine className="text-2xl text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-xl font-bold text-gray-800">{averageScore}%</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex items-center p-4 border border-green-100 bg-gradient-to-br from-green-50 to-green-100 rounded-xl"
              >
                <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-500 rounded-full">
                  <FaUsers className="text-2xl text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Participants</p>
                  <p className="text-xl font-bold text-gray-800">{totalParticipants.toLocaleString()}</p>
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
                <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-gradient-to-br from-green-500 to-green-600">
                  <FaBrain className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">About This Survey</h2>
              </div>
              
              <p className="mb-4 leading-relaxed text-gray-700">{description}</p>
              
              <div className="p-4 mb-4 border border-green-100 rounded-lg bg-green-50">
                <h3 className="mb-2 font-bold text-gray-800">Survey Topics:</h3>
                <ul className="space-y-1">
                  {topics.map((topic, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheckCircle className="flex-shrink-0 mt-1 mr-2 text-green-500" />
                      <span className="text-gray-700">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border border-green-100 rounded-lg bg-green-50">
                <h3 className="mb-2 font-bold text-gray-800">Benefits You'll Gain:</h3>
                <ul className="space-y-1">
                  {skillsGained.map((skill, index) => (
                    <li key={index} className="flex items-start">
                      <FaStar className="flex-shrink-0 mt-1 mr-2 text-green-500" />
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            {/* Sample questions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-gradient-to-br from-green-500 to-green-600">
                  <FaLightbulb className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Sample Questions</h2>
              </div>
              
              <div className="space-y-5">
                {previewQuestions.slice(0, expanded ? 5 : 3).map((q, idx) => (
                  <div key={idx} className="p-5 bg-white border border-green-100 shadow-md rounded-xl">
                    <h3 className="mb-3 text-lg font-bold text-gray-800">{idx + 1}. {q.question}</h3>
                    <div className="space-y-2">
                      {q.options.map((option, i) => (
                        <div 
                          key={i} 
                          className={`p-3 rounded-lg border ${
                            q.answer === i
                              ? "bg-green-100 border-green-300"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 flex-shrink-0 rounded-full mr-3 border-2 flex items-center justify-center ${
                              q.answer === i 
                                ? "border-green-500 bg-green-100" 
                                : "border-gray-300"
                            }`}>
                              {q.answer === i && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                            </div>
                            <span className={q.answer === i ? "font-medium text-green-800" : "text-gray-700"}>
                              {option}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {previewQuestions.length > 3 && (
                <div className="mt-4 text-center">
                  <button 
                    onClick={() => setExpanded(!expanded)}
                    className="inline-flex items-center font-medium text-green-600 hover:text-green-700"
                  >
                    {expanded ? 'Show Less' : 'Show More Examples'}
                    <svg 
                      className={`ml-1 w-4 h-4 transform transition-transform ${expanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </motion.div>
            
            {/* Start quiz button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center flex-1 px-6 py-4 text-lg font-bold text-white transition-colors duration-300 shadow-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl"
              >
                Start Survey Now
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center flex-1 px-6 py-4 text-lg font-bold text-green-600 transition-colors duration-300 border-2 border-green-500 sm:flex-none hover:bg-green-50 rounded-xl"
              >
                Save for Later
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizDetail;