import React, { useState, useEffect } from 'react';
import { Trash2, Award, RefreshCw } from 'lucide-react';

const WasteSorterGame = () => {
  // Questions array with waste sorting themed questions
  const questions = [
    {
      question: "Where should you dispose of a plastic water bottle?",
      options: ["General waste", "Recycling bin", "Compost bin", "Hazardous waste"],
      correctAnswer: 1,
      explanation: "Plastic bottles are recyclable and should go in the recycling bin. Remember to empty them first!"
    },
    {
      question: "What waste category do banana peels belong to?",
      options: ["General waste", "Recycling bin", "Compost bin", "Hazardous waste"],
      correctAnswer: 2,
      explanation: "Banana peels are organic waste and perfect for composting."
    },
    {
      question: "Where should you dispose of broken glass?",
      options: ["General waste (wrapped safely)", "Recycling bin", "Compost bin", "Special glass collection"],
      correctAnswer: 0,
      explanation: "Broken glass should be wrapped carefully and placed in general waste, as it can be dangerous to recycling workers."
    },
    {
      question: "Which bin should used batteries go into?",
      options: ["General waste", "Recycling bin", "Compost bin", "Hazardous waste/special collection"],
      correctAnswer: 3,
      explanation: "Batteries contain hazardous materials and should be taken to special collection points."
    },
    {
      question: "Where should you dispose of a cardboard pizza box with food residue?",
      options: ["General waste", "Recycling bin", "Compost bin", "Remove soiled parts first, then recycle"],
      correctAnswer: 3,
      explanation: "The clean parts can be recycled, but food-soiled cardboard should be composted or thrown in general waste."
    },
    {
      question: "Where should you dispose of plastic grocery bags?",
      options: ["General waste", "Recycling bin", "Special plastic bag recycling", "Reuse them"],
      correctAnswer: 2,
      explanation: "Most curbside recycling doesn't accept plastic bags. Take them to grocery stores with plastic bag recycling programs."
    },
    {
      question: "Which bin is appropriate for coffee grounds?",
      options: ["General waste", "Recycling bin", "Compost bin", "Hazardous waste"],
      correctAnswer: 2,
      explanation: "Coffee grounds are excellent for composting and add nitrogen to the compost."
    }
  ];

  // Game state
  const [gameStage, setGameStage] = useState('start'); // 'start', 'playing', 'end'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [characterIsTalking, setCharacterIsTalking] = useState(true);
  const [characterSpeech, setCharacterSpeech] = useState(
    "Hi there! I'm Recyclo, your waste sorting guide. Let's see if you know how to sort your waste correctly!"
  );

  // Start the game
  const startGame = () => {
    setGameStage('playing');
    setCurrentQuestion(0);
    setScore(0);
    setCharacterIsTalking(true);
    setSelectedOption(null);
  };

  // Handle option selection
  const selectOption = (index) => {
    setSelectedOption(index);
    setCharacterIsTalking(false);

    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setCharacterSpeech(`That's correct! ${questions[currentQuestion].explanation}`);
    } else {
      setCharacterSpeech(
        `Not quite! The correct answer is ${
          questions[currentQuestion].options[questions[currentQuestion].correctAnswer]
        }. ${questions[currentQuestion].explanation}`
      );
    }
  };

  // Move to next question
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setCharacterIsTalking(true);
    } else {
      setGameStage('end');
    }
  };

  // Restart the game
  const restartGame = () => {
    setGameStage('start');
    setCharacterSpeech(
      "Hi there! I'm Recyclo, your waste sorting guide. Let's see if you know how to sort your waste correctly!"
    );
    setCharacterIsTalking(true);
  };

  // Set character speech based on current question
  useEffect(() => {
    if (gameStage === 'playing' && selectedOption === null) {
      setCharacterSpeech(questions[currentQuestion].question);
    }
  }, [currentQuestion, gameStage, selectedOption, questions]);

  // Calculate percentage for the end screen
  const percentage = Math.round((score / questions.length) * 100);

  // Get final message based on score
  const getFinalMessage = () => {
    if (percentage >= 80) {
      return "Excellent! You're a waste sorting master!";
    } else if (percentage >= 60) {
      return "Good job! You know the basics of waste sorting!";
    } else {
      return "Keep learning about waste sorting. It's important for our planet!";
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center text-green-700">Waste Sorter Challenge</h1>
      
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        {/* Character and speech bubble section */}
        <div className="flex flex-col items-center gap-6 p-6 bg-green-50 md:flex-row">
          <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40">
            <div className={`bg-green-200 rounded-full p-4 h-full w-full flex items-center justify-center ${
              characterIsTalking ? 'animate-pulse' : ''
            }`}>
              <Trash2 size={characterIsTalking ? 70 : 60} className="text-green-600 transition-all duration-300" />
            </div>
          </div>
          
          <div className="relative flex-1 p-4 bg-white rounded-lg shadow-sm">
            <div className="absolute left-0 hidden -translate-x-1/2 -translate-y-1/2 top-1/2 md:block">
              <div className="w-4 h-4 transform rotate-45 bg-white"></div>
            </div>
            <p className="text-gray-700">{characterSpeech}</p>
          </div>
        </div>
        
        {/* Game content */}
        <div className="p-6">
          {gameStage === 'start' && (
            <div className="py-8 text-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Ready to test your waste sorting knowledge?</h2>
              <p className="mb-8 text-gray-600">
                Proper waste sorting is crucial for recycling and reducing landfill waste. 
                This quiz will test your knowledge on where different items should go.
              </p>
              <button 
                onClick={startGame}
                className="px-8 py-3 font-bold text-white transition-colors duration-200 bg-green-600 rounded-lg shadow-md hover:bg-green-700"
              >
                Start Quiz
              </button>
            </div>
          )}
          
          {gameStage === 'playing' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm font-medium text-gray-500">
                  Question: {currentQuestion + 1}/{questions.length}
                </div>
                <div className="px-3 py-1 font-medium text-green-800 bg-green-100 rounded-full">
                  Score: {score}
                </div>
              </div>
              
              <div className="mb-6 space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectedOption === null && selectOption(index)}
                    className={`w-full text-left p-4 border rounded-lg transition-colors duration-200 ${
                      selectedOption === null 
                        ? 'border-gray-200 hover:border-green-300 hover:bg-green-50' 
                        : selectedOption === index
                          ? index === questions[currentQuestion].correctAnswer
                            ? 'bg-green-100 border-green-500'
                            : 'bg-red-100 border-red-500'
                          : index === questions[currentQuestion].correctAnswer
                            ? 'bg-green-100 border-green-500'
                            : 'opacity-50 border-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              <div className="text-center">
                <button
                  onClick={nextQuestion}
                  disabled={selectedOption === null}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    selectedOption !== null
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  } transition-colors duration-200`}
                >
                  {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                </button>
              </div>
            </div>
          )}
          
          {gameStage === 'end' && (
            <div className="py-8 text-center">
              <div className="inline-block p-4 mb-4 bg-green-100 rounded-full">
                <Award size={60} className="text-green-600" />
              </div>
              
              <h2 className="mb-2 text-2xl font-bold text-gray-800">Quiz Complete!</h2>
              
              <div className="mb-6">
                <p className="text-xl font-bold">
                  Your Score: {score}/{questions.length} ({percentage}%)
                </p>
                <p className="mt-2 text-gray-600">{getFinalMessage()}</p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => startGame()}
                  className="w-full px-6 py-3 font-bold text-white transition-colors duration-200 bg-green-600 rounded-lg shadow-md sm:w-auto hover:bg-green-700"
                >
                  <RefreshCw size={16} className="inline mr-2" />
                  Try Again
                </button>
                
                <button
                  onClick={restartGame}
                  className="w-full px-6 py-3 font-bold text-green-600 transition-colors duration-200 bg-white border border-green-600 rounded-lg shadow-sm sm:w-auto hover:bg-green-50"
                >
                  Back to Start
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Information panel */}
      <div className="p-6 mt-8 rounded-lg bg-green-50">
        <h3 className="mb-3 text-xl font-bold text-green-800">Why Proper Waste Sorting Matters</h3>
        <ul className="space-y-2 text-green-700">
          <li>• Reduces landfill waste and greenhouse gas emissions</li>
          <li>• Conserves natural resources by recycling materials</li>
          <li>• Prevents contamination of recyclable materials</li>
          <li>• Lowers pollution in our oceans and natural environments</li>
          <li>• Composting organic waste creates nutrient-rich soil</li>
        </ul>
      </div>
    </div>
  );
};

export default WasteSorterGame;