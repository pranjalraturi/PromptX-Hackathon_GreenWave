import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaLeaf, FaClock, FaCheck, FaTimes, FaLightbulb, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const EcoTriviaGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(20); // seconds per question
  const [pointsAwarded, setPointsAwarded] = useState(null);
  const [message, setMessage] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Game data
  useEffect(() => {
    // This would typically come from a backend API
    // For now, we'll hard-code the questions
    const gameQuestions = [
      {
        id: 1,
        question: "What is the largest contributor to greenhouse gas emissions?",
        options: [
          "Transportation",
          "Electricity and heat production", 
          "Agriculture", 
          "Buildings"
        ],
        correctAnswer: 1,
        explanation: "Electricity and heat production account for approximately 25% of global greenhouse gas emissions, primarily from burning fossil fuels like coal, natural gas, and oil."
      },
      {
        id: 2,
        question: "What percentage of the Earth's surface is covered by water?",
        options: [
          "50%", 
          "60%", 
          "71%", 
          "85%"
        ],
        correctAnswer: 2,
        explanation: "Approximately 71% of the Earth's surface is covered by water, with oceans making up about 96.5% of all Earth's water."
      },
      {
        id: 3,
        question: "What is the primary cause of ocean acidification?",
        options: [
          "Oil spills", 
          "Plastic pollution", 
          "Agricultural runoff", 
          "Carbon dioxide absorption"
        ],
        correctAnswer: 3,
        explanation: "When oceans absorb CO2 from the atmosphere, it reacts with seawater to form carbonic acid, increasing the water's acidity. This process is known as ocean acidification."
      },
      {
        id: 4,
        question: "Which of these everyday actions has the highest carbon footprint?",
        options: [
          "Taking a hot shower", 
          "Using a clothes dryer", 
          "Eating a beef burger", 
          "Driving 10 miles in an average car"
        ],
        correctAnswer: 2,
        explanation: "Beef production requires significant resources and produces substantial methane emissions, giving it a higher carbon footprint than the other options listed."
      },
      {
        id: 5,
        question: "What percentage of plastic waste worldwide is recycled?",
        options: [
          "Around 9%", 
          "Around 25%", 
          "Around 45%", 
          "Around 60%"
        ],
        correctAnswer: 0,
        explanation: "Despite widespread recycling programs, only about 9% of plastic waste is actually recycled globally. The majority ends up in landfills or the environment."
      },
      {
        id: 6,
        question: "Which of these renewable energy sources has shown the greatest percentage growth in the past decade?",
        options: [
          "Hydroelectric", 
          "Wind", 
          "Solar", 
          "Geothermal"
        ],
        correctAnswer: 2,
        explanation: "Solar energy has experienced the highest growth rate among renewable energy sources, with capacity growing by approximately 40% annually in recent years."
      },
      {
        id: 7,
        question: "What is the average temperature increase of the Earth since pre-industrial times?",
        options: [
          "0.5°C", 
          "1.0°C", 
          "1.5°C", 
          "2.0°C"
        ],
        correctAnswer: 1,
        explanation: "According to the IPCC, the Earth has warmed by approximately 1.0°C since pre-industrial times, with significant impacts already visible."
      },
      {
        id: 8,
        question: "How much water does it take to produce one cotton t-shirt?",
        options: [
          "About 500 liters", 
          "About 1,500 liters", 
          "About 2,700 liters", 
          "About 5,000 liters"
        ],
        correctAnswer: 2,
        explanation: "It takes around 2,700 liters of water to produce a single cotton t-shirt, equivalent to what one person drinks in 2.5 years."
      },
      {
        id: 9,
        question: "Which activity contributes most to deforestation worldwide?",
        options: [
          "Logging for timber", 
          "Paper production", 
          "Urban expansion", 
          "Agricultural expansion"
        ],
        correctAnswer: 3,
        explanation: "Agricultural expansion, particularly for livestock grazing and growing feed crops, is the leading cause of deforestation globally."
      },
      {
        id: 10,
        question: "What percentage of the world's energy comes from renewable sources?",
        options: [
          "Around 11%", 
          "Around 26%", 
          "Around 38%", 
          "Around 52%"
        ],
        correctAnswer: 1,
        explanation: "Approximately 26% of global electricity comes from renewable sources, though this percentage is growing steadily each year."
      }
    ];
    
    setQuestions(gameQuestions);
    setLoading(false);
  }, []);
  
  // Timer
  useEffect(() => {
    if (loading || gameOver || isAnswered) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestionIndex, loading, gameOver, isAnswered]);
  
  // Handle timeout
  const handleTimeout = () => {
    setIsAnswered(true);
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };
  
  // Answer selection
  const handleOptionSelect = (optionIndex) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    const isCorrect = optionIndex === questions[currentQuestionIndex].correctAnswer;
    
    if (isCorrect) {
      // Award points based on time left (faster = more points)
      const questionPoints = Math.max(5, Math.ceil(10 * (timeLeft / 20)));
      setScore(prev => prev + questionPoints);
      setCorrectAnswers(prev => prev + 1);
    }
    
    // Wait before moving to next question
    setTimeout(() => {
      setShowExplanation(true);
    }, 800);
  };
  
  // Continue to next question
  const nextQuestion = () => {
    setShowExplanation(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(20);
    } else {
      // Game over - all questions answered
      setGameOver(true);
      submitScore();
    }
  };
  
  // Submit score to backend
  const submitScore = async () => {
    try {
      // Calculate percentage score (0-100)
      const percentageScore = Math.round((correctAnswers / questions.length) * 100);
      
      const response = await axios.post('/games/submit-score', {
        gameId: 'eco-trivia',
        score: percentageScore,
        correctAnswers,
        totalQuestions: questions.length
      });
      
      setPointsAwarded(response.data.pointsEarned);
      setMessage(response.data.message);
      
    } catch (err) {
      console.error('Error submitting score:', err);
      setMessage('Error submitting score. Points may not have been awarded.');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <div className="w-16 h-16 border-4 border-t-4 border-green-400 rounded-full border-t-green-200 animate-spin"></div>
      </div>
    );
  }
  
  // Game over screen
  if (gameOver) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-green-50">
        <motion.div 
          className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-center text-green-600">Game Over!</h2>
          
          <div className="p-6 mb-6 text-center rounded-lg bg-green-50">
            <div className="mb-4 text-5xl font-bold text-green-600">{correctAnswers} / {questions.length}</div>
            <p className="text-lg text-gray-600">Correct Answers</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 text-center rounded-lg bg-blue-50">
              <div className="mb-1 text-3xl font-bold text-blue-600">{Math.round((correctAnswers / questions.length) * 100)}%</div>
              <p className="text-sm text-gray-600">Accuracy</p>
            </div>
            <div className="p-4 text-center rounded-lg bg-amber-50">
              <div className="mb-1 text-3xl font-bold text-amber-600">{pointsAwarded || '-'}</div>
              <p className="text-sm text-gray-600">Points Earned</p>
            </div>
          </div>
          
          {message && (
            <div className="p-4 mb-6 text-center bg-green-100 rounded-lg">
              {message}
            </div>
          )}
          
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => navigate('/games')}
              className="px-6 py-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
            >
              Back to Games
            </button>
            <button 
              onClick={() => {
                setCurrentQuestionIndex(0);
                setSelectedOption(null);
                setIsAnswered(false);
                setScore(0);
                setCorrectAnswers(0);
                setGameOver(false);
                setTimeLeft(20);
                setPointsAwarded(null);
                setMessage('');
              }}
              className="px-6 py-2 text-green-500 transition-colors bg-white border border-green-500 rounded-lg hover:bg-green-50"
            >
              Play Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }
  
  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  
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
        
        {/* Progress bar */}
        <div className="w-full h-2 mb-6 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
          ></div>
        </div>
        
        {/* Question card */}
        <motion.div 
          className="w-full max-w-2xl p-6 mx-auto mb-6 bg-white rounded-lg shadow-lg"
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Question number and timer */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div className={`flex items-center px-3 py-1 rounded-full ${timeLeft <= 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              <FaClock className="mr-1" />
              <span className="font-semibold">{timeLeft}s</span>
            </div>
          </div>
          
          {/* Question text */}
          <h3 className="mb-6 text-xl font-semibold text-gray-800">
            {currentQuestion.question}
          </h3>
          
          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
                className={`
                  w-full p-4 text-left transition border rounded-lg ${
                    isAnswered
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-100 border-green-500'
                        : index === selectedOption
                        ? 'bg-red-100 border-red-500'
                        : 'bg-white border-gray-200 opacity-70'
                      : 'bg-white hover:border-blue-500 hover:bg-blue-50 border-gray-200'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isAnswered && index === currentQuestion.correctAnswer && (
                    <FaCheck className="text-green-500" />
                  )}
                  {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && (
                    <FaTimes className="text-red-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Explanation */}
        {showExplanation && (
          <motion.div
            className="w-full max-w-2xl p-5 mx-auto mb-6 border border-blue-200 rounded-lg shadow-md bg-blue-50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start">
              <FaLightbulb className="mt-1 mr-3 text-amber-500" />
              <div>
                <h4 className="mb-1 text-lg font-medium text-gray-800">Explanation</h4>
                <p className="text-gray-600">{currentQuestion.explanation}</p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button 
                onClick={nextQuestion}
                className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Next Question
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EcoTriviaGame;