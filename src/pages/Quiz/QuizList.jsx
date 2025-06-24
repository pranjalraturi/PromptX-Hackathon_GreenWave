import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSearch, FaFilter, FaSlidersH, FaBrain, FaLightbulb, 
  FaBook, FaStar, FaMedal, FaClock, FaChartBar
} from 'react-icons/fa';

const QuizList = ({ quizzes = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = ['All', 'Climate', 'Wildlife', 'Conservation', 'Sustainability', 'Pollution', 'Ecosystems'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Expert'];
  
  // Filter quizzes based on search term and filters
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || quiz.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || quiz.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  
  // Sample data if no quizzes are provided
  const displayQuizzes = filteredQuizzes.length > 0 ? filteredQuizzes : [
    {
      id: 1,
      title: "Carbon Footprint Survey",
      description: "Discover your environmental impact with our comprehensive carbon footprint assessment and learn ways to reduce your ecological footprint.",
      category: "Sustainability",
      difficulty: "Beginner",
      questions: 20,
      timeEstimate: "10 min",
      completionRate: 82,
      points: 200,
      image: "https://images.unsplash.com/photo-1569097387886-10d7a5d88a45?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Endangered Species Challenge",
      description: "Learn about threatened and endangered species around the world and conservation efforts.",
      category: "Wildlife",
      difficulty: "Intermediate",
      questions: 15,
      timeEstimate: "15 min",
      completionRate: 65,
      points: 150,
      image: "https://images.unsplash.com/photo-1535338454770-8be927b5a00a?q=80&w=1374&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Sustainable Living Expert Quiz",
      description: "Advanced questions about sustainable practices, zero-waste lifestyle, and eco-friendly choices.",
      category: "Sustainability",
      difficulty: "Expert",
      questions: 25,
      timeEstimate: "20 min",
      completionRate: 42,
      points: 250,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1374&auto=format&fit=crop"
    }
  ];

  return (
    <div className="relative min-h-screen pb-16 overflow-hidden bg-gradient-to-b from-green-50 via-green-100 to-green-50">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2LTJoLTF2MnptMC0xM2gxdjloLTF2LTl6bS00IDBoMXYxaC0xdi0xem0wIDJoMXYxaC0xdi0xem0wLTR2MWgxdi0xaC0xem0tMiAwaDF2MWgtMXYtMXptMiA4aDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bTQgMGgxdjFoLTF2LTF6TTEwIDh2MWgxVjhoLTF6bTIgMGgxVjhoLTF2MXptNCAwdjFoMVY4aC0xem0wIDJoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptMiA0aDFWMTNoLTF2MXptMCAydjFoMXYtMWgtMXptLTItMmgxdi0yaC0xdjJ6bTAgNGgxdjFoLTF2LTF6bTIgMGgxdjFoLTF2LTF6bS0yLThoMXYtMmgtMXYyem0tMi0yaDF2LTJoLTF2MnptMCA0aDF2LTJoLTF2MnptMCA2aDFWMTVoLTF2MXptMCAxMGgxdi0yaC0xdjJ6bS0yLTIzdjFoMXYtMWgtMXptMCAxMGgxdi0yaC0xdjJ6bTAgOGgxdi0yaC0xdjJ6bTAgNGgxdi0yaC0xdjJ6bTAgNmgxdi0yaC0xdjJ6TTcgOXYxaDFWOUg3em0wIDZ2MWgxdi0xSDd6bTAgNHYxaDEgMXYtMUg4SDd6bTAgOHYxaDEgMXYtMUg4SDd6bTAgNnYxaDEgMXYtMUg4SDd6TTUgOXYxaDFWOUg1em0wIDR2MWgxdi0xSDV6bTAgNnYxaDF2LTFINXptMCA0djFoMXYtMUg1em0wIDZ2MWgxdi0xSDV6TTMgOHYxaDFWOEgzem0wIDZ2MWgxdi0xSDN6bTAgNnYxaDF2LTFIM3ptMCA2djFoMXYtMUgzem0wLTEyaDEgMXYtMUg0SDN6TTEgOHYxaDF2LTNIMXY4aDFWOEgxem0wIDEwaDF2Mkgxdi0yem0wIDR2M2gxIDFWMjJIMkgxeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-green-500/10 to-transparent"></div>
      
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-green-500/10 to-transparent"></div>
      
      <div className="absolute top-20 right-10 opacity-20">
        <svg width="500" height="500" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#046307" strokeWidth="1" strokeDasharray="5,5" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="#046307" strokeWidth="1" strokeDasharray="3,3" fill="none" />
          <circle cx="50" cy="50" r="20" stroke="#046307" strokeWidth="1" fill="none" />
        </svg>
      </div>
      
      <div className="absolute bottom-20 left-10 opacity-20">
        <svg width="400" height="400" viewBox="0 0 100 100">
          <polygon points="50,0 100,50 50,100 0,50" stroke="#046307" strokeWidth="1" fill="none" />
          <polygon points="50,10 90,50 50,90 10,50" stroke="#046307" strokeWidth="1" fill="none" />
          <polygon points="50,20 80,50 50,80 20,50" stroke="#046307" strokeWidth="1" fill="none" />
        </svg>
      </div>
      
      <div className="absolute text-green-900 transform top-1/4 left-1/4 opacity-5 rotate-12">
        <FaBrain className="w-40 h-40" />
      </div>
      
      <div className="absolute text-green-900 transform bottom-1/4 right-1/4 opacity-5 -rotate-12">
        <FaLightbulb className="w-32 h-32" />
      </div>

      {/* Animated particle effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none particles">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-green-600 rounded-full opacity-20"
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
      
      {/* Main content */}
      <div className="relative px-4 py-12 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 text-white shadow-lg bg-gradient-to-br from-green-500 to-green-700 rounded-2xl">
            <FaBrain className="w-10 h-10" />
          </div>
          <h1 className="mb-3 text-4xl font-bold text-gray-800">Eco Knowledge Quizzes</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Test your environmental knowledge, learn fascinating facts, and earn points through fun interactive quizzes
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="sticky top-0 z-10 p-5 mb-10 overflow-hidden border border-green-100 shadow-xl bg-white/90 backdrop-blur-lg rounded-2xl"
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
                placeholder="Search for quizzes by title or topic..."
                className="w-full py-3 pl-10 pr-4 text-gray-700 border-0 rounded-lg shadow-inner bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 font-medium text-green-700 transition-colors duration-300 rounded-lg shadow-sm bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200"
            >
              <FaSlidersH className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            <div className="px-4 py-2 text-sm font-medium text-white rounded-full shadow-sm bg-gradient-to-r from-green-500 to-green-600">
              {displayQuizzes.length} quizzes available
            </div>
          </div>
          
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-5 mt-4 border border-green-200 border-dashed rounded-lg bg-green-50"
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
        
        {displayQuizzes.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayQuizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="h-full"
                >
                  <Link to={`/quizzes/${quiz.id}`} className="block h-full">
                    <div className="h-full overflow-hidden transition-all duration-300 transform bg-white border border-green-100 shadow-lg group rounded-2xl hover:shadow-xl hover:-translate-y-2">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={quiz.image} 
                          alt={quiz.title} 
                          className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-110"
                        />
                        <div className="absolute top-0 left-0 m-3">
                          <span className="px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r from-green-500 to-green-600">
                            {quiz.category}
                          </span>
                        </div>
                        <div className="absolute top-0 right-0 m-3">
                          <span className="px-3 py-1 text-xs font-medium text-green-700 bg-white rounded-full shadow-md">
                            {quiz.difficulty}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-t from-black/70 to-transparent">
                          <div className="flex items-center text-white">
                            <FaMedal className="mr-1" />
                            <span>{quiz.points} pts</span>
                          </div>
                          <div className="flex items-center text-white">
                            <FaClock className="mr-1" />
                            <span>{quiz.timeEstimate}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <h3 className="mb-2 text-xl font-bold text-gray-800">{quiz.title}</h3>
                        <p className="mb-4 text-gray-600 line-clamp-3">{quiz.description}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-gray-500">
                            <FaBook className="mr-2 text-green-500" />
                            <span>{quiz.questions} questions</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <FaChartBar className="mr-2 text-green-500" />
                            <span>{quiz.completionRate}% completion</span>
                          </div>
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2 font-medium text-center text-white transition-colors duration-300 rounded-lg shadow-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                        >
                          Start Quiz
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center mt-12"
            >
              <div className="px-6 py-3 font-medium text-gray-600 bg-gray-100 border border-gray-200 rounded-full shadow-sm">
                No More Quizzes Available
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-8 py-16 text-center border border-green-100 shadow-lg bg-white/90 rounded-2xl backdrop-blur-sm"
          >
            <div className="flex justify-center mb-6">
              <div className="p-6 text-green-200 rounded-full bg-green-50">
                <FaBook className="w-16 h-16" />
              </div>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-700">No quizzes found</h3>
            <p className="max-w-md mx-auto mb-8 text-gray-500">
              Try adjusting your search or filters to find eco quizzes that match your interests.
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

export default QuizList;