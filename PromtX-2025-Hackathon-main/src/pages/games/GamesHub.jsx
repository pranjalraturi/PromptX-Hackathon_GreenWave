import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaGamepad, FaLeaf, FaMedal, FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const GamesHub = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        
        // Mock data until API is fully implemented
        const mockGames = [
          {
            id: 'eco-trivia',
            title: 'Eco-Trivia Challenge',
            description: 'Test your environmental knowledge with this fun trivia game!',
            imageUrl: '',
            maxPoints: 50,
            difficulty: 'Medium',
            estimatedTime: '5 min'
          },
          {
            id: 'carbon-reducer',
            title: 'Carbon Footprint Reducer',
            description: 'Make choices to reduce your virtual carbon footprint in this simulation game.',
            imageUrl: '',
            maxPoints: 50,
            difficulty: 'Easy',
            estimatedTime: '8 min'
          },
          {
            id: 'waste-sorter',
            title: 'Waste Sorting Master',
            description: 'Sort various items into the correct recycling bins as fast as you can!',
            imageUrl: '',
            maxPoints: 50,
            difficulty: 'Hard',
            estimatedTime: '3 min'
          }
        ];
        
        try {
          // Try to get data from API, fallback to mock data if needed
          const response = await axios.get('/games');
          // Check if response.data is an array
          if (Array.isArray(response.data) && response.data.length > 0) {
            setGames(response.data);
          } else {
            console.log('API returned non-array data, using mock data instead');
            setGames(mockGames);
          }
        } catch (err) {
          console.log('Using mock data due to API error:', err.message);
          setGames(mockGames);
        }
        
      } catch (err) {
        console.error('Error in games setup:', err);
        setError('Failed to load games. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGames();
  }, []);
  
  // Game-specific image map
  const gameImages = {
    'eco-trivia': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80', // Nature quiz image
    'carbon-reducer': 'https://images.unsplash.com/photo-1615500025837-cf3e974bd4e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Carbon footprint image
    'waste-sorter': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Recycling/waste image
  };
  
  // Default fallback image if game ID doesn't match or image fails to load
  const defaultGameImage = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2913&q=80';
  
  // Add a safety check before mapping
  const renderGames = () => {
    if (!Array.isArray(games)) {
      return (
        <div className="p-6 text-center rounded-lg bg-red-50">
          <p className="text-red-600">Error loading games data.</p>
        </div>
      );
    }
    
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map(game => (
          <Link to={`/games/${game.id}`} key={game.id}>
            <motion.div 
              className="overflow-hidden transition-all bg-white rounded-lg shadow-md hover:shadow-xl"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative h-48 overflow-hidden bg-gray-200">
                {/* Game card image with game-specific images */}
                <img 
                  src={game.imageUrl || gameImages[game.id] || defaultGameImage} 
                  alt={game.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = defaultGameImage;
                  }}
                  loading="lazy"
                />
                {/* Game difficulty badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 text-xs font-bold text-white rounded-full ${
                    game.difficulty === 'Easy' ? 'bg-green-500' : 
                    game.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                    {game.difficulty}
                  </span>
                </div>
                {/* Play overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 hover:opacity-100">
                  <span className="px-4 py-2 text-white bg-green-600 rounded-full">
                    Play Now
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-xl font-bold text-gray-900">{game.title}</h3>
                <p className="mb-4 text-gray-600 line-clamp-2">{game.description}</p>
                
                <div className="flex flex-wrap justify-between text-sm">
                  <div className="flex items-center mr-4 text-amber-600">
                    <FaMedal className="mr-1" />
                    <span>Up to {game.maxPoints} points</span>
                  </div>
                  <div>
                    <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                      {game.difficulty}
                    </span>
                    <span className="ml-2 text-gray-500">{game.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    );
  };
  
  return (
    <div className="py-10 bg-gradient-to-br from-green-50 to-green-100">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header section remains the same */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">Eco Games Hub</h1>
              <p className="text-lg text-gray-600">
                Play fun games, learn about environmental impact, and earn points!
              </p>
            </div>
            <div className="px-4 py-2 bg-white shadow-md rounded-xl">
              <div className="flex items-center">
                <FaLeaf className="mr-2 text-green-500" />
                <span className="font-medium text-gray-900">{user?.points || 0} Points</span>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-56">
              <svg className="w-10 h-10 text-green-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          ) : (
            <>
              <div className="p-6 mb-8 text-white shadow-lg bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl">
                <div className="flex flex-col items-center md:flex-row">
                  <div className="mb-4 md:mb-0 md:mr-6">
                    <FaGamepad className="text-5xl md:text-6xl opacity-90" />
                  </div>
                  <div>
                    <h2 className="mb-2 text-xl font-bold md:text-2xl">Why Play Our Eco-Games?</h2>
                    <ul className="space-y-1 list-disc list-inside opacity-90">
                      <li>Learn about environmental sustainability in a fun way</li>
                      <li>Earn points to redeem for eco-friendly rewards</li>
                      <li>Challenge yourself with increasing difficulty levels</li>
                      <li>Track your progress and improve your knowledge</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {renderGames()}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GamesHub;