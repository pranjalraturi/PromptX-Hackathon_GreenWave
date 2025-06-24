import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaLeaf, FaHome, FaUtensils, FaShoppingBag, FaCar, FaPlane, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const CarbonReducerGame = () => {
  const [stage, setStage] = useState('intro');
  const [carbon, setCarbon] = useState(10000); // starting carbon in kg
  const [day, setDay] = useState(1);
  const [choices, setChoices] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [message, setMessage] = useState('');
  const [reductions, setReductions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(null);
  const [resultMessage, setResultMessage] = useState('');
  
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Categories for choices
  const categories = [
    { id: 'home', name: 'Home', icon: <FaHome /> },
    { id: 'food', name: 'Food', icon: <FaUtensils /> },
    { id: 'shopping', name: 'Shopping', icon: <FaShoppingBag /> },
    { id: 'transport', name: 'Transport', icon: <FaCar /> },
    { id: 'travel', name: 'Travel', icon: <FaPlane /> },
  ];
  
  // Game data - choices for each day
  const dailyChoices = [
    // Day 1
    [
      { 
        id: 1, 
        category: 'home',
        title: 'How will you heat your home today?',
        options: [
          { text: 'Turn the thermostat up to 75°F (24°C)', carbon: 15, impact: 'high' },
          { text: 'Set thermostat to 68°F (20°C)', carbon: 8, impact: 'medium' },
          { text: 'Put on a sweater and keep thermostat at 65°F (18°C)', carbon: 5, impact: 'low' },
          { text: `Use only spot heating in the room you're in', carbon: 3, impact: 'very-low' ` }
        ],
        fact: 'Heating accounts for about 42% of home energy use. Each 1°F reduction saves about 3% on your heating bill and reduces emissions.'
      },
      { 
        id: 2, 
        category: 'transport',
        title: 'How will you get to work today?',
        options: [
          { text: 'Drive alone in an SUV', carbon: 22, impact: 'very-high' },
          { text: 'Carpool with a colleague', carbon: 11, impact: 'medium' },
          { text: 'Take public transit', carbon: 6, impact: 'low' },
          { text: 'Walk or bike', carbon: 0, impact: 'zero' }
        ],
        fact: 'A typical passenger vehicle emits about 4.6 metric tons of carbon dioxide per year, assuming it travels 11,500 miles (18,500 km) annually.'
      }
    ],
    // Day 2
    [
      { 
        id: 3, 
        category: 'food',
        title: 'What will you eat for lunch today?',
        options: [
          { text: 'Beef burger with fries', carbon: 15, impact: 'high' },
          { text: 'Chicken sandwich', carbon: 8, impact: 'medium' },
          { text: 'Vegetarian pasta dish', carbon: 5, impact: 'low' },
          { text: 'Local, seasonal salad with plant-based protein', carbon: 2, impact: 'very-low' }
        ],
        fact: 'Beef production creates about 60kg of greenhouse gas emissions per kg of meat, while vegetables produce only 2-3kg for the same amount.'
      },
      { 
        id: 4, 
        category: 'home',
        title: 'How will you manage your electronics today?',
        options: [
          { text: 'Leave everything plugged in and on standby', carbon: 5, impact: 'high' },
          { text: 'Turn off devices but leave them plugged in', carbon: 2, impact: 'medium' },
          { text: 'Unplug unused devices and use power strips', carbon: 1, impact: 'low' },
          { text: 'Use only essential electronics and unplug the rest', carbon: 0.5, impact: 'very-low' }
        ],
        fact: 'Standby power can account for 5-10% of residential electricity use. This "vampire power" costs Americans $19 billion annually.'
      }
    ],
    // Day 3
    [
      { 
        id: 5, 
        category: 'shopping',
        title: 'You need new clothes. What do you do?',
        options: [
          { text: 'Buy new fast-fashion items', carbon: 15, impact: 'high' },
          { text: 'Buy fewer, higher-quality new items', carbon: 10, impact: 'medium' },
          { text: 'Shop at secondhand stores', carbon: 3, impact: 'low' },
          { text: 'Repair what you have or organize a clothing swap', carbon: 0.5, impact: 'very-low' }
        ],
        fact: 'The fashion industry produces 10% of global carbon emissions and is the second-largest consumer of water. A single cotton shirt requires 2,700 liters of water to produce.'
      },
      { 
        id: 6, 
        category: 'home',
        title: 'How will you do laundry today?',
        options: [
          { text: 'Wash a small load with hot water and machine dry', carbon: 6, impact: 'high' },
          { text: 'Wash a full load with warm water and machine dry', carbon: 3, impact: 'medium' },
          { text: 'Wash full load with cold water and hang dry', carbon: 0.8, impact: 'low' },
          { text: 'Wait until you have more laundry to wash', carbon: 0, impact: 'zero' }
        ],
        fact: 'Washing clothes in cold water can reduce energy use by up to 90% compared to using hot water. Air-drying clothes can save around 3kg of CO2 per load.'
      }
    ],
    // Day 4
    [
      { 
        id: 7, 
        category: 'transport',
        title: 'How will you handle errands today?',
        options: [
          { text: 'Make multiple separate trips by car', carbon: 12, impact: 'high' },
          { text: 'Combine all errands into one car trip', carbon: 5, impact: 'medium' },
          { text: 'Walk or bike for local errands, drive for distant ones', carbon: 2, impact: 'low' },
          { text: 'Order online with consolidated delivery or use public transit', carbon: 1, impact: 'very-low' }
        ],
        fact: 'Combining multiple errands into one trip can reduce your transportation emissions by up to 50%, especially when the engine is still cold.'
      },
      { 
        id: 8, 
        category: 'food',
        title: 'You\'re grocery shopping. What do you do?',
        options: [
          { text: 'Buy pre-packaged, processed foods', carbon: 8, impact: 'high' },
          { text: 'Buy a mix of fresh and packaged foods', carbon: 5, impact: 'medium' },
          { text: 'Buy mostly fresh, locally produced items', carbon: 2, impact: 'low' },
          { text: 'Buy only seasonal, local produce and bulk items with reusable bags', carbon: 0.5, impact: 'very-low' }
        ],
        fact: 'Food packaging accounts for about 5% of the energy used in the food system. The average American throws away 4.5 pounds (2kg) of trash daily, with packaging being a significant component.'
      }
    ],
    // Day 5
    [
      { 
        id: 9, 
        category: 'travel',
        title: 'You\'re planning a weekend getaway (300 miles/480 km away). How will you travel?',
        options: [
          { text: 'Fly there for the weekend', carbon: 250, impact: 'very-high' },
          { text: 'Drive there alone', carbon: 120, impact: 'high' },
          { text: 'Take a train or bus', carbon: 60, impact: 'medium' },
          { text: 'Choose a closer destination accessible by public transit', carbon: 30, impact: 'low' }
        ],
        fact: `A single round-trip flight from New York to London emits around 1.7 tonnes of CO2 per person, roughly 11% of the average American's annual carbon footprint.`},
      { 
        id: 10, 
        category: 'home',
        title: 'How will you cool your home on a hot day?',
        options: [
          { text: 'Run the air conditioner all day at 68°F (20°C)', carbon: 20, impact: 'very-high' },
          { text: 'Run the AC at 78°F (25°C) during the day', carbon: 10, impact: 'medium' },
          { text: 'Use fans and only run AC during the hottest part of the day', carbon: 5, impact: 'low' },
          { text: 'Open windows at night, close blinds during day, and use fans', carbon: 0.5, impact: 'very-low' }
        ],
        fact: 'Air conditioning accounts for about 12% of U.S. home energy expenditures. Each degree lower you set your thermostat increases energy use by 3-5%.'
      }
    ]
  ];
  
  // Start game
  const startGame = () => {
    setStage('playing');
    setChoices(dailyChoices[0]);
  };
  
  // Make a choice
  const makeChoice = (choiceId, optionIndex) => {
    // Find the choice and selected option
    const choice = choices.find(c => c.id === choiceId);
    const option = choice.options[optionIndex];
    
    // Calculate carbon impact
    const carbonReduction = option.carbon;
    setCarbon(prev => prev - carbonReduction);
    
    // Record the choice
    setSelectedChoice({
      day: day,
      choice: choice,
      selectedOption: option,
      carbonReduction: carbonReduction
    });
    
    // Add to reductions list
    setReductions(prev => [...prev, {
      day: day,
      title: choice.title,
      option: option.text,
      carbon: carbonReduction,
      impact: option.impact
    }]);
    
    // Show feedback message
    if (option.impact === 'very-low' || option.impact === 'zero') {
        setMessage("Excellent choice! You've significantly reduced your carbon footprint.");
      } else if (option.impact === 'low') {
        setMessage("Good choice! You're making a positive impact.");
      } else if (option.impact === 'medium') {
        setMessage("Decent choice. There's still room for improvement.");
      } else {
        setMessage("This choice has a significant carbon impact. Consider more sustainable options next time.");
      }
    
    // Move to facts screen
    setStage('facts');
  };
  
  // Move to next day
  const nextDay = () => {
    if (day < 5) {
      setDay(prev => prev + 1);
      setChoices(dailyChoices[day]);
      setSelectedChoice(null);
      setMessage('');
      setStage('playing');
    } else {
      // End game after 5 days
      endGame();
    }
  };
  
  // End game
  const endGame = () => {
    setGameOver(true);
    
    // Calculate score based on remaining carbon
    // Starting carbon is 10000, so calculate how much was saved
    const carbonSaved = 10000 - carbon;
    const percentageSaved = (carbonSaved / 10000) * 100;
    
    // Determine score 0-100
    let score;
    if (percentageSaved >= 80) score = 100;
    else if (percentageSaved >= 60) score = 90;
    else if (percentageSaved >= 40) score = 80;
    else if (percentageSaved >= 25) score = 70;
    else if (percentageSaved >= 15) score = 60;
    else score = 50;
    
    setFinalScore(score);
    submitScore(score);
  };
  
  // Submit score to backend
  const submitScore = async (score) => {
    setLoading(true);
    try {
      const response = await axios.post('/games/submit-score', {
        gameId: 'carbon-reducer',
        score: score,
        correctAnswers: Math.round((score / 100) * 10), // Scale to 0-10
        totalQuestions: 10
      });
      
      setPointsAwarded(response.data.pointsEarned);
      setResultMessage(response.data.message);
      
    } catch (err) {
      console.error('Error submitting score:', err);
      setResultMessage('Error submitting score. Points may not have been awarded.');
    } finally {
      setLoading(false);
    }
  };
  
  // Render intro screen
  if (stage === 'intro') {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex justify-between mb-6">
            <button 
              onClick={() => navigate('/games')}
              className="flex items-center px-4 py-2 text-gray-600 bg-white rounded-lg shadow hover:bg-gray-50"
            >
              <FaArrowLeft className="mr-2" /> Back to Games
            </button>
            <div className="px-4 py-2 bg-white rounded-lg shadow">
              <div className="flex items-center">
                <FaLeaf className="mr-2 text-green-500" />
                <span className="font-medium text-gray-900">{user?.points || 0} Points</span>
              </div>
            </div>
          </div>
          
          <motion.div
            className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-center text-green-600">Carbon Footprint Reducer</h2>
            
            <div className="mb-6 text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 text-white bg-green-500 rounded-full">
                <FaLeaf className="w-10 h-10" />
              </div>
              <p className="mb-4 text-lg text-gray-700">
                Make daily choices to reduce your carbon footprint! Over 5 simulated days, you'll face real-life decisions and see their environmental impact.
              </p>
            </div>
            
            <div className="p-4 mb-6 bg-blue-50 rounded-md">
              <h3 className="mb-2 text-lg font-semibold text-blue-800">How to Play:</h3>
              <ul className="ml-5 space-y-1 text-gray-700 list-disc">
                <li>You start with a carbon budget of 10,000 kg</li>
                <li>Each day presents you with choices affecting your carbon emissions</li>
                <li>Choose wisely to minimize your footprint</li>
                <li>Learn interesting environmental facts along the way</li>
                <li>After 5 days, see your final impact and earn points!</li>
              </ul>
            </div>
            
            <div className="text-center">
              <button
                onClick={startGame}
                className="px-8 py-3 text-lg font-medium text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
              >
                Start Game
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  // Render game over screen
  if (gameOver) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto">
          <div className="flex justify-between mb-6">
            <button 
              onClick={() => navigate('/games')}
              className="flex items-center px-4 py-2 text-gray-600 bg-white rounded-lg shadow hover:bg-gray-50"
            >
              <FaArrowLeft className="mr-2" /> Back to Games
            </button>
          </div>
          
          <motion.div
            className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-2 text-3xl font-bold text-center text-green-600">Game Over!</h2>
            <p className="mb-6 text-center text-gray-600">
              You've completed the 5-day Carbon Reducer Challenge
            </p>
            
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div className="p-4 text-center bg-green-50 rounded-lg">
                <div className="mb-1 text-sm text-gray-600">Your Carbon Footprint</div>
                <div className="text-3xl font-bold text-green-600">{carbon.toLocaleString()} kg</div>
                <div className="mt-1 text-sm text-gray-500">
                  You saved {(10000 - carbon).toLocaleString()} kg of CO<sub>2</sub>
                </div>
              </div>
              
              <div className="p-4 text-center bg-blue-50 rounded-lg">
                <div className="mb-1 text-sm text-gray-600">Your Score</div>
                <div className="text-3xl font-bold text-blue-600">{finalScore}/100</div>
                <div className="mt-1 text-sm text-gray-500">
                  {finalScore >= 90 ? 'Outstanding!' : 
                   finalScore >= 80 ? 'Excellent!' : 
                   finalScore >= 70 ? 'Great job!' : 
                   finalScore >= 60 ? 'Good effort!' : 'Keep trying!'}
                </div>
              </div>
            </div>
            
            <div className="p-4 mb-6 text-center bg-amber-50 rounded-lg">
              <div className="mb-1 text-sm text-gray-600">Points Earned</div>
              <div className="text-2xl font-bold text-amber-600">
                {loading ? '...' : pointsAwarded !== null ? pointsAwarded : '-'}
              </div>
              {resultMessage && <div className="mt-1 text-sm text-gray-600">{resultMessage}</div>}
            </div>
            
            <h3 className="mb-3 text-xl font-semibold text-gray-700">Your Choices Summary:</h3>
            <div className="mb-6 overflow-auto max-h-60">
              {reductions.map((reduction, index) => (
                <div key={index} className={`p-3 mb-2 rounded-md ${
                  reduction.impact === 'very-low' || reduction.impact === 'zero' ? 'bg-green-100' :
                  reduction.impact === 'low' ? 'bg-green-50' :
                  reduction.impact === 'medium' ? 'bg-yellow-50' :
                  'bg-red-50'
                }`}>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">Day {reduction.day}: {reduction.title}</span>
                    <span className="font-semibold">{reduction.carbon} kg</span>
                  </div>
                  <p className="text-sm text-gray-600">{reduction.option}</p>
                </div>
              ))}
            </div>
            
            <div className="p-4 mb-6 text-gray-700 bg-blue-50 rounded-md">
              <h4 className="mb-2 font-semibold">What You've Learned:</h4>
              <p>
                The average person's carbon footprint is about 5 tons per year in developing countries and up to 20 tons in developed nations. Your daily choices significantly impact this number. By making more sustainable choices like those in this game, you can reduce your real-world carbon footprint.
              </p>
            </div>
            
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => navigate('/games')}
                className="px-6 py-2 text-gray-600 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back to Games
              </button>
              <button 
                onClick={() => {
                  setStage('intro');
                  setCarbon(10000);
                  setDay(1);
                  setChoices([]);
                  setSelectedChoice(null);
                  setMessage('');
                  setReductions([]);
                  setGameOver(false);
                  setFinalScore(0);
                }}
                className="px-6 py-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
              >
                Play Again
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  // Render facts screen
  if (stage === 'facts') {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto">
          <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <div className="p-4 mb-6 text-center bg-blue-50 rounded-lg">
              <h3 className="mb-2 text-xl font-semibold text-blue-800">Did You Know?</h3>
              <p className="text-gray-700">{selectedChoice.choice.fact}</p>
            </div>
            
            <div className="p-4 mb-6 rounded-lg" style={{ backgroundColor: 
              selectedChoice.selectedOption.impact === 'very-low' || selectedChoice.selectedOption.impact === 'zero' ? '#dcfce7' :
              selectedChoice.selectedOption.impact === 'low' ? '#ecfdf5' :
              selectedChoice.selectedOption.impact === 'medium' ? '#fef9c3' :
              '#fee2e2'
            }}>
              <p className="mb-2 font-semibold text-gray-700">Your choice:</p>
              <p className="text-gray-800">{selectedChoice.selectedOption.text}</p>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="font-medium text-gray-600">Carbon impact:</span>
                <span className="font-bold" style={{ color:
                  selectedChoice.selectedOption.impact === 'very-low' || selectedChoice.selectedOption.impact === 'zero' ? '#16a34a' :
                  selectedChoice.selectedOption.impact === 'low' ? '#4ade80' :
                  selectedChoice.selectedOption.impact === 'medium' ? '#ca8a04' :
                  '#ef4444'
                }}>
                  {selectedChoice.carbonReduction} kg CO<sub>2</sub>
                </span>
              </div>
            </div>
            
            <div className="p-4 mb-6 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">Current carbon footprint:</span>
                <span className="text-xl font-bold text-green-600">{carbon.toLocaleString()} kg</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${Math.min(100, (1 - carbon/10000) * 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Day {day}/5</span>
                <span>{Math.round((1 - carbon/10000) * 100)}% reduced</span>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={nextDay}
                className="px-6 py-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
              >
                {day < 5 ? 'Next Day' : 'Finish Game'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Render main game screen (playing)
  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between mb-6">
          <button 
            onClick={() => navigate('/games')}
            className="flex items-center px-4 py-2 text-gray-600 bg-white rounded-lg shadow hover:bg-gray-50"
          >
            <FaArrowLeft className="mr-2" /> Back to Games
          </button>
          <div className="px-4 py-2 bg-white rounded-lg shadow">
            <div className="flex items-center">
              <FaLeaf className="mr-2 text-green-500" />
              <span className="font-medium text-gray-900">{user?.points || 0} Points</span>
            </div>
          </div>
        </div>
        
        {/* Game progress */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium text-gray-700">Day {day} of 5</div>
            <div className="font-medium text-gray-700">Carbon: {carbon.toLocaleString()} kg</div>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-green-500 rounded-full" 
              style={{ width: `${Math.min(100, ((day - 1) / 5) * 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Choices */}
        <div className="grid gap-6 max-w-2xl mx-auto">
          {choices.map(choice => (
            <motion.div
              key={choice.id}
              className="overflow-hidden bg-white rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-10 h-10 mr-3 text-white bg-green-500 rounded-full">
                    {categories.find(cat => cat.id === choice.category)?.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{choice.title}</h3>
                </div>
                
                <div className="space-y-3">
                  {choice.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => makeChoice(choice.id, index)}
                      className="w-full p-4 text-left transition border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarbonReducerGame;