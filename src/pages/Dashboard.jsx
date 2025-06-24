import React, { useState, useEffect, useRef } from 'react';
import { Bell, User, Settings, LogOut, Search, Menu, ChevronDown, Award, Home, Calendar, BarChart2, Users, HelpCircle, Leaf, Droplet, Wind, Sun, CheckCircle, Quote, Github, Linkedin, Twitter, MessageSquare, Send } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { FaGamepad, FaMedal, FaLeaf } from 'react-icons/fa';
// Import new components
import InitiativesList from './Initiatives/InitiativesList';
import InitiativeDetail from './Initiatives/InitiativeDetail';
// Import scrollbar styles
import '../styles/scrollbar.css';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [showTreePlantedConfirmation, setShowTreePlantedConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  // New state for chatbot
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hello! I\'m your EcoAssistant. How can I help you with your sustainability journey today?' }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [showFooter, setShowFooter] = useState(false);
  const mainContentRef = useRef(null);
  
  const navigate = useNavigate();
  
  // Sample carbon footprint data
  const carbonData = [
    { month: 'Jan', carbon: 2.1 },
    { month: 'Feb', carbon: 1.8 },
    { month: 'Mar', carbon: 1.6 },
    { month: 'Apr', carbon: 1.4 },
    { month: 'May', carbon: 1.2 },
    { month: 'Jun', carbon: 1.0 },
  ];

  // Sample user data
  const user = {
    name: "Rohit Sharma",
    email: "rohitsharma2@gmail.com",
    avatar: "https://i.pravatar.cc/80?img=11", // Placeholder avatar
    score: 2750,
    level: 12,
    progress: 75, // percentage to next level
    notifications: 3,
    recentActivities: [
      { id: 1, type: "achievement", text: "Planted 5 virtual trees", time: "2 hours ago" },
      { id: 2, type: "score", text: "Earned 150 eco-points", time: "Yesterday" },
      { id: 3, type: "system", text: "New feature: Carbon footprint tracker", time: "2 days ago" }
    ],
    stats: [
      { label: "Eco Points", value: 270, icon: <Leaf size={20} className="text-green-600" /> },
      { label: "Trees Planted", value: 24, icon: <Droplet size={20} className="text-green-600" /> },
      { label: "Eco Ranking", value: "#42", icon: <Award size={20} className="text-green-600" /> },
      { label: "Green Streak", value: "7 days", icon: <Wind size={20} className="text-green-600" /> }
    ],
    // Daily quote for inspiration
    dailyQuote: {
      text: "The Earth does not belong to us: we belong to the Earth.",
      author: "Marlee Matlin"
    }
  };

  // Eco actions
  const ecoActions = [
    { id: 1, title: "Reduce Water Usage", points: 50, description: "Turn off the tap while brushing teeth to save up to 8 gallons of water daily." },
    { id: 2, title: "Sustainable Transport", points: 75, description: "Use public transportation, bike, or walk instead of driving alone." },
    { id: 3, title: "Reduce Food Waste", points: 40, description: "Plan meals, use leftovers, and compost food scraps to reduce waste." },
    { id: 4, title: "Energy Conservation", points: 60, description: "Unplug electronics when not in use to reduce phantom energy usage." }
  ];

  // Green events data
  const greenEvents = [
    { 
      id: 1, 
      title: "Community Tree Planting", 
      date: "Tomorrow, 9:00 AM",
      location: "Central Park",
      description: "Join us to plant native trees and help improve our local ecosystem."
    },
    { 
      id: 2, 
      title: "Sustainability Workshop", 
      date: "Saturday, 2:00 PM",
      location: "Community Center",
      description: "Learn practical tips for sustainable living and reducing your carbon footprint."
    },
    { 
      id: 3, 
      title: "Solar Panel Informational", 
      date: "Next Tuesday, 6:00 PM",
      location: "Virtual (Zoom)",
      description: "Discover how solar energy can reduce your environmental impact and utility bills."
    },
  ];

  // Community members
  const communityMembers = [
    { id: 1, name: "Jamie Smith", level: 15, points: 3200, avatar: "https://i.pravatar.cc/80?img=1" },
    { id: 2, name: "Taylor Green", level: 14, points: 3100, avatar: "https://i.pravatar.cc/80?img=2" },
    { id: 3, name: "Morgan Lee", level: 13, points: 2900, avatar: "https://i.pravatar.cc/80?img=3" },
    { id: 4, name: "Alex Johnson", level: 12, points: 2750, avatar: "https://i.pravatar.cc/80?img=11", isCurrentUser: true },
    { id: 5, name: "Jordan Wilson", level: 10, points: 2400, avatar: "https://i.pravatar.cc/80?img=5" },
  ];

  // Games data
  const gamesData = [
    {
      id: 'eco-trivia',
      title: 'Eco-Trivia Challenge',
      description: 'Test your environmental knowledge with this fun trivia game!',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80',
      maxPoints: 50,
      difficulty: 'Medium',
      estimatedTime: '5 min',
      route: '/games/eco-trivia'
    },
    {
      id: 'carbon-reducer',
      title: 'Carbon Footprint Reducer',
      description: 'Make choices to reduce your virtual carbon footprint in this simulation game.',
      imageUrl: 'https://images.unsplash.com/photo-1615500025837-cf3e974bd4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      maxPoints: 50,
      difficulty: 'Easy',
      estimatedTime: '8 min',
      route: '/games/carbon-reducer'
    },
    {
      id: 'waste-sorter',
      title: 'Waste Sorting Master',
      description: 'Sort various items into the correct recycling bins as fast as you can!',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      maxPoints: 50,
      difficulty: 'Hard',
      estimatedTime: '3 min',
      route: '/games/waste-sorter'
    }
  ];

  // Survey questions for eco actions
  const surveyQuestions = [
    {
      id: 1,
      question: "How do you typically commute to work/school?",
      options: ["Car (alone)", "Carpool", "Public transport", "Bicycle/Walk"]
    },
    {
      id: 2,
      question: "How often do you use reusable shopping bags?",
      options: ["Always", "Most of the time", "Sometimes", "Rarely/Never"]
    },
    {
      id: 3,
      question: "How many plant-based meals do you eat per week?",
      options: ["None", "1-3", "4-7", "More than 7"]
    }
  ];
  
  // Plant a tree functionality
  const plantVirtualTree = () => {
    // In a real app, this would connect to an API
    setShowTreePlantedConfirmation(true);
    
    // Auto-hide confirmation after 3 seconds
    setTimeout(() => {
      setShowTreePlantedConfirmation(false);
    }, 3000);
  };
  
  // Survey modal functions
  const openSurveyModal = () => {
    setShowSurveyModal(true);
  };

  const closeSurveyModal = () => {
    setShowSurveyModal(false);
  };

  const submitSurvey = (e) => {
    e.preventDefault();
    // In a real app, this would process the survey data
    closeSurveyModal();
    // Would typically update user's eco score here
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isNotificationOpen) setIsNotificationOpen(false);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
  };

  // Chatbot functions
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    // Add user message to chat
    const updatedMessages = [
      ...chatMessages, 
      { sender: 'user', text: userMessage }
    ];
    setChatMessages(updatedMessages);
    setUserMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's a great eco-friendly idea! Research shows it could reduce your carbon footprint by up to 15%.",
        "Have you considered composting? It's a great way to reduce waste and create nutrient-rich soil for your garden.",
        "Energy conservation tip: LED bulbs use up to 90% less energy than incandescent bulbs and last much longer.",
        "Did you know? A single reusable water bottle can replace hundreds of single-use plastic bottles annually.",
        "Great question! Reducing meat consumption by even one day per week can significantly lower your carbon footprint.",
        "Water conservation is crucial. Consider installing low-flow faucets and showerheads to reduce water usage by up to 60%."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      setChatMessages([
        ...updatedMessages,
        { sender: 'ai', text: randomResponse }
      ]);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!mainContentRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = mainContentRef.current;
      
      // Show footer when scrolled near bottom (within 100px of bottom)
      if (scrollHeight - scrollTop - clientHeight < 100) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };
    
    const contentElement = mainContentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const renderContent = () => {
    switch(activeTab) {
      case 'eco-actions':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Eco Actions</h1>
            
            <div className="p-4 mb-6 border border-green-300 rounded-lg bg-green-50">
              <h3 className="mb-2 text-lg font-medium text-green-800">Why Take Eco Actions?</h3>
              <p className="text-green-700">
                Every eco-friendly action you take helps reduce your carbon footprint and contributes to a healthier planet.
                Complete these actions to earn eco points and track your positive environmental impact.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {ecoActions.map(action => (
                <div key={action.id} className="p-5 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{action.title}</h3>
                      <p className="mt-2 text-gray-600">{action.description}</p>
                    </div>
                    <span className="px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full">
                      +{action.points} points
                    </span>
                  </div>
                  <button 
                    onClick={openSurveyModal}
                    className="w-full px-4 py-2 mt-4 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Log This Action
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'carbon-tracker':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Carbon Footprint Tracker</h1>
            
            <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Your Carbon Footprint</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={carbonData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis label={{ value: 'CO₂ (tons)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value} tons`, 'Carbon Emissions']} />
                    <Area 
                      type="monotone" 
                      dataKey="carbon" 
                      stroke="#059669" 
                      fill="#059669" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500">This Month</p>
                  <p className="font-bold text-green-600">-12% CO₂</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Last Month</p>
                  <p className="font-bold">1.2 tons CO₂</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Goal</p>
                  <p className="font-bold">0.8 tons CO₂</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="mb-4 text-lg font-medium">Carbon Reduction Tips</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="p-1 mr-2 bg-green-100 rounded-full">
                      <Leaf size={16} className="text-green-600" />
                    </div>
                    <p className="text-sm">Use energy-efficient appliances and LED light bulbs.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 mr-2 bg-green-100 rounded-full">
                      <Leaf size={16} className="text-green-600" />
                    </div>
                    <p className="text-sm">Reduce meat consumption, especially red meat.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 mr-2 bg-green-100 rounded-full">
                      <Leaf size={16} className="text-green-600" />
                    </div>
                    <p className="text-sm">Choose public transport or carpooling when possible.</p>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="mb-4 text-lg font-medium">Carbon Offset Programs</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Consider investing in carbon offset programs to neutralize emissions you can't eliminate.
                </p>
                <button className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
                  Explore Offset Options
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'events':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Green Events</h1>
            
            <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="mb-2 text-lg font-medium sm:mb-0">Upcoming Events</h3>
                <button className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
                  Create Event
                </button>
              </div>
              
              <div className="mt-6 space-y-6">
                {greenEvents.map(event => (
                  <div key={event.id} className="p-4 transition-colors border border-gray-200 rounded-lg hover:border-green-300">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex items-center justify-center w-16 h-16 mr-4 text-white bg-green-600 rounded-lg">
                        <Calendar size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium">{event.title}</h4>
                        <div className="flex flex-wrap mt-2 text-sm text-gray-600">
                          <p className="mr-4"><span className="font-medium">When:</span> {event.date}</p>
                          <p><span className="font-medium">Where:</span> {event.location}</p>
                        </div>
                        <p className="mt-2 text-gray-600">{event.description}</p>
                        <div className="flex mt-4 space-x-2">
                          <button className="px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700">
                            Join Event
                          </button>
                          <button className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'community':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Eco Community</h1>
            
            <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Eco Leaderboard</h3>
              
              <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Rank
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Level
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Eco Points
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {communityMembers.map((member, index) => (
                      <tr key={member.id} className={member.isCurrentUser ? "bg-green-50" : ""}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{index + 1}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img className="w-10 h-10 rounded-full" src={member.avatar} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {member.name} {member.isCurrentUser && <span className="text-xs text-green-600">(You)</span>}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Level {member.level}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{member.points}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Community Initiatives</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="text-lg font-medium">Tree Planting Challenge</h4>
                  <p className="mt-2 text-sm text-gray-600">
                    Join our community goal to plant 1,000 trees this year. Currently at 342 trees.
                  </p>
                  <div className="w-full h-2 mt-3 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-600 rounded-full" style={{ width: '34%' }}></div>
                  </div>
                  <button className="px-4 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Contribute
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="text-lg font-medium">Plastic Reduction</h4>
                  <p className="mt-2 text-sm text-gray-600">
                    Community challenge to reduce single-use plastics. Share your tips and progress.
                  </p>
                  <button className="px-4 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Join Challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'initiatives':
        return selectedInitiative ? (
          <div>
            <button 
              onClick={() => setSelectedInitiative(null)}
              className="flex items-center mb-6 text-sm font-medium text-green-700 hover:text-green-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Initiatives
            </button>
            <InitiativeDetail initiative={selectedInitiative} />
          </div>
        ) : (
          <div>
            <h1 className="mb-6 text-2xl font-bold text-gray-800">Community Initiatives</h1>
            <InitiativesList 
              onSelectInitiative={(initiative) => setSelectedInitiative(initiative)}
            />
          </div>
        );
        
      case 'games':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Eco Games</h1>
              <button 
                onClick={() => navigate('/games')}
                className="px-4 py-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
              >
                View All Games
              </button>
            </div>
            
            <div className="p-4 mb-6 border border-green-300 rounded-lg bg-green-50">
              <h3 className="mb-2 text-lg font-medium text-green-800">Why Play Eco Games?</h3>
              <p className="text-green-700">
                Our educational games help you learn about sustainability while earning eco-points. 
                Complete challenges, test your knowledge, and make a positive impact on the environment!
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {gamesData.map(game => (
                <div 
                  key={game.id}
                  onClick={() => navigate(game.route)}
                  className="overflow-hidden transition-all bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-200">
                    <img 
                      src={game.imageUrl} 
                      alt={game.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 text-xs font-bold text-white rounded-full ${
                        game.difficulty === 'Easy' ? 'bg-green-500' : 
                        game.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}>
                        {game.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-bold text-gray-900">{game.title}</h3>
                    <p className="mb-3 text-sm text-gray-600 line-clamp-2">{game.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-amber-600">
                        <FaMedal className="mr-1" />
                        <span>Up to {game.maxPoints} points</span>
                      </div>
                      <span className="text-gray-500">{game.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <div className="inline-flex p-1 bg-white rounded-lg shadow">
                <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-600">
                  <FaLeaf className="mr-2 text-green-500" />
                  Total Eco-Points Earned from Games: 220
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <>
            <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between">
              <h1 className="text-2xl font-bold text-gray-800">Sustainability Dashboard</h1>
              <div className="mt-4 space-x-2 md:mt-0">
                <button 
                  onClick={openSurveyModal} 
                  className="px-4 py-2 mr-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Log Eco Action
                </button>
                <button 
                  onClick={plantVirtualTree}
                  className="px-4 py-2 mr-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                >
                  Plant a Tree
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Share Progress
                </button>
              </div>
            </div>
            
            {/* Daily Inspirational Quote */}
            <div className="p-4 mb-6 bg-green-700 rounded-lg shadow-md bg-opacity-90">
              <div className="flex items-start">
                <Quote size={24} className="mt-1 mr-3 text-green-100" />
                <div className="flex-1">
                  <p className="text-lg italic text-white">{user.dailyQuote.text}</p>
                  <p className="mt-2 text-sm text-green-100">— {user.dailyQuote.author}</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
              {user.stats.map((stat, index) => (
                <div key={index} className="p-6 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md">
                  <div className="flex items-center mb-2">
                    {stat.icon}
                    <h3 className="ml-2 text-sm text-gray-500">{stat.label}</h3>
                  </div>
                  <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Level Progress */}
            <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Progress to Eco Level {user.level + 1}</h3>
                <span className="text-sm text-gray-500">{user.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${user.progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Carbon Footprint Chart */}
            <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Your Carbon Footprint</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={carbonData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} tons`, 'Carbon Emissions']} />
                    <Area 
                      type="monotone" 
                      dataKey="carbon" 
                      stroke="#059669" 
                      fill="#059669" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">This Month</p>
                  <p className="font-bold text-green-600">-12% CO₂</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Last Month</p>
                  <p className="font-bold">1.2 tons CO₂</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Goal</p>
                  <p className="font-bold">0.8 tons CO₂</p>
                </div>
              </div>
            </div>
            
            {/* Recent Activities and Upcoming Events */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="mb-4 text-lg font-medium">Recent Eco Activities</h3>
                <div className="space-y-4">
                  {user.recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="p-2 mr-3 bg-green-100 rounded-full">
                        <Leaf size={16} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.text}</p>
                        <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-sm text-green-600 hover:text-green-800">View all activities</button>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="mb-4 text-lg font-medium">Upcoming Green Events</h3>
                <div className="space-y-4">
                  <div className="flex items-start pb-4 border-b border-gray-100">
                    <div className="p-2 mr-3 bg-green-100 rounded-full">
                      <Calendar size={16} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Community Tree Planting</p>
                      <p className="mt-1 text-xs text-gray-500">Tomorrow, 9:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start pb-4 border-b border-gray-100">
                    <div className="p-2 mr-3 bg-green-100 rounded-full">
                      <Users size={16} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Sustainability Workshop</p>
                      <p className="mt-1 text-xs text-gray-500">Saturday, 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-2 mr-3 bg-green-100 rounded-full">
                      <Sun size={16} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Solar Panel Informational</p>
                      <p className="mt-1 text-xs text-gray-500">Next Tuesday, 6:00 PM</p>
                    </div>
                  </div>
                </div>
                <button className="mt-4 text-sm text-green-600 hover:text-green-800">View all events</button>
              </div>
            </div>

            {/* Sustainability Tips */}
            <div className="p-6 mt-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Daily Eco Tip</h3>
              <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                <p className="text-green-800">
                  <span className="font-bold">Reusable Water Bottles:</span> Switching to a reusable water bottle can save 
                  approximately 156 plastic bottles annually per person. This small change can significantly reduce your 
                  plastic waste footprint and save you money in the long run.
                </p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-green-50">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`bg-green-800 text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}>
          <div className="flex items-center justify-between p-4">
            {isSidebarOpen && (
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 mr-2 text-white bg-green-600 rounded-md">
                  <Leaf size={16} />
                </div>
                <span className="text-xl font-bold">GreenWaves</span>
              </div>
            )}
            <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-green-700">
              <Menu size={20} />
            </button>
          </div>
          
          <nav className="flex-1 mt-8">
            <ul>
              <li className="mb-2">
                <a 
                  href="#" 
                  className={`flex items-center p-3 mx-2 text-white rounded-lg ${activeTab === 'dashboard' ? 'bg-green-900' : 'hover:bg-green-700'}`}
                  onClick={() => handleNavClick('dashboard')}
                >
                  <Home size={20} />
                  {isSidebarOpen && <span className="ml-3">Dashboard</span>}
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  className={`flex items-center p-3 mx-2 text-white rounded-lg ${activeTab === 'eco-actions' ? 'bg-green-900' : 'hover:bg-green-700'}`}
                  onClick={() => handleNavClick('eco-actions')}
                >
                  <Leaf size={20} />
                  {isSidebarOpen && <span className="ml-3">Eco Actions</span>}
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  className={`flex items-center p-3 mx-2 text-white rounded-lg ${activeTab === 'carbon-tracker' ? 'bg-green-900' : 'hover:bg-green-700'}`}
                  onClick={() => handleNavClick('carbon-tracker')}
                >
                  <BarChart2 size={20} />
                  {isSidebarOpen && <span className="ml-3">Carbon Tracker</span>}
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  className={`flex items-center p-3 mx-2 text-white rounded-lg ${activeTab === 'events' ? 'bg-green-900' : 'hover:bg-green-700'}`}
                  onClick={() => handleNavClick('events')}
                >
                  <Calendar size={20} />
                  {isSidebarOpen && <span className="ml-3">Green Events</span>}
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  className={`flex items-center p-3 mx-2 text-white rounded-lg ${activeTab === 'community' ? 'bg-green-900' : 'hover:bg-green-700'}`}
                  onClick={() => handleNavClick('community')}
                >
                  <Users size={20} />
                  {isSidebarOpen && <span className="ml-3">Community</span>}
                </a>
              </li>
              {/* New Initiative navigation item */}
              <li className="mb-2">
                <a 
                  href="#" 
                  className={`flex items-center p-3 mx-2 text-white rounded-lg ${activeTab === 'initiatives' ? 'bg-green-900' : 'hover:bg-green-700'}`}
                  onClick={() => handleNavClick('initiatives')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {isSidebarOpen && <span className="ml-3">Initiatives</span>}
                </a>
              </li>
              {/* Games navigation item */}
              <li className="mb-2">
                <a 
                  href="#" 
                  className={`flex items-center p-3 mx-2 text-white rounded-lg ${activeTab === 'games' ? 'bg-green-900' : 'hover:bg-green-700'}`}
                  onClick={() => handleNavClick('games')}
                >
                  <FaGamepad size={20} />
                  {isSidebarOpen && <span className="ml-3">Games</span>}
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="p-4">
            <a href="#" className="flex items-center p-3 text-white rounded-lg hover:bg-green-700">
              <HelpCircle size={20} />
              {isSidebarOpen && <span className="ml-3">Eco Resources</span>}
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Navigation */}
          <header className="flex items-center justify-between h-16 px-6 bg-white shadow-sm">
            <div className="relative w-64">
              <input 
                type="text" 
                placeholder="Search sustainable tips..." 
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search size={18} className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
            </div>
            
            <div className="flex items-center">
              {/* Score Display */}
              <div className="flex items-center px-4 py-2 mr-6 bg-green-100 rounded-full">
                <Leaf size={16} className="mr-2 text-green-600" />
                <span className="font-semibold text-green-800">{user.score} Eco Points</span>
                <span className="px-2 py-1 ml-2 text-xs text-green-600 bg-green-200 rounded-full">Level {user.level}</span>
              </div>

              {/* Notifications */}
              <div className="relative mr-4">
                <button 
                  onClick={toggleNotification}
                  className="relative p-2 rounded-full hover:bg-gray-100"
                >
                  <Bell size={20} />
                  {user.notifications > 0 && (
                    <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-green-500 rounded-full">
                      {user.notifications}
                    </span>
                  )}
                </button>
                
                {isNotificationOpen && (
                  <div className="absolute right-0 z-10 py-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-80">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="font-semibold">Eco Updates</h3>
                    </div>
                    <div className="overflow-y-auto max-h-64">
                      {user.recentActivities.map(activity => (
                        <div key={activity.id} className="px-4 py-3 border-b border-gray-100 hover:bg-green-50 last:border-0">
                          <p className="text-sm">{activity.text}</p>
                          <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 text-center border-t border-gray-200">
                      <a href="#" className="text-sm text-green-600 hover:text-green-800">View all updates</a>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img 
                    src={user.avatar} 
                    alt="Profile"
                    className="object-cover w-8 h-8 border-2 border-green-500 rounded-full"
                  />
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500">Eco Level {user.level}</p>
                  </div>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 z-10 w-64 py-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <ul>
                      <li>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
                          <User size={16} className="mr-3 text-gray-500" />
                          Eco Profile
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
                          <Settings size={16} className="mr-3 text-gray-500" />
                          Settings
                        </a>
                      </li>
                      <li className="mt-2 border-t border-gray-200">
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-green-50">
                          <LogOut size={16} className="mr-3 text-red-500" />
                          Log out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </header>
          
          {/* Dashboard Content */}
          <main 
            ref={mainContentRef} 
            className="flex-1 p-6 overflow-y-auto"
          >
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Footer - now conditionally shown based on scroll position */}
      <footer 
        className={`py-4 bg-white border-t border-gray-200 sm:py-6 transition-all duration-300 ${
          showFooter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
        } fixed bottom-0 left-0 right-0 z-10`}
      >
        <div className="container px-4 mx-auto sm:px-6">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand and copyright */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 mr-2 text-white bg-green-600 rounded-md">
                  <Leaf size={16} />
                </div>
                <span className="text-lg font-bold text-green-800">GreenWaves</span>
              </div>
              <p className="text-sm text-gray-500">
                Making sustainability accessible through technology.
                <br />© 2025 GreenWaves. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 transition-colors hover:text-green-600">
                  <Github size={20} />
                </a>
                <a href="#" className="text-gray-400 transition-colors hover:text-green-600">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-gray-400 transition-colors hover:text-green-600">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            {/* Resources */}
            <div className="pt-2 sm:pt-0">
              <h3 className="mb-3 text-sm font-semibold text-gray-800 uppercase sm:mb-4">Resources</h3>
              <div className="pr-2 overflow-y-auto max-h-36 custom-scrollbar">
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-500 hover:text-green-600">Blog</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-green-600">Sustainability Guide</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-green-600">Carbon Calculator</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-green-600">FAQs</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-green-600">Community Events</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-green-600">Eco-Friendly Products</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-green-600">Research Papers</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-green-600">Video Tutorials</a></li>
                </ul>
              </div>
            </div>
            
            {/* Company */}
            <div className="pt-2 sm:pt-0">
              <h3 className="mb-3 text-sm font-semibold text-gray-800 uppercase sm:mb-4">Company</h3>
              <div className="pr-2 overflow-y-auto max-h-36 custom-scrollbar">
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-500 hover:text-green-600">About Us</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-green-600">Our Team</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-green-600">Partners</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-green-600">Contact</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-green-600">Careers</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-green-600">Press Kit</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-green-600">Investors</a></li>
                </ul>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="pt-2 sm:pt-0">
              <h3 className="mb-3 text-sm font-semibold text-gray-800 uppercase sm:mb-4">Stay Updated</h3>
              <p className="mb-3 text-sm text-gray-500 sm:mb-4">Subscribe to our newsletter for tips and updates on sustainability.</p>
              <form className="flex flex-col sm:flex-row">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full px-3 py-2 mb-2 border border-gray-300 rounded sm:mb-0 sm:rounded-r-none focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <button 
                  type="submit" 
                  className="w-full px-4 py-2 text-white bg-green-600 rounded sm:w-auto sm:rounded-l-none hover:bg-green-700"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
          
          {/* Bottom links */}
          <div className="pt-6 mt-6 border-t border-gray-200 sm:pt-8 sm:mt-8">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <div className="flex flex-col space-y-2 text-center sm:flex-row sm:space-y-0 sm:space-x-4 sm:text-left">
                <a href="#" className="text-sm text-gray-500 hover:text-green-600">Privacy Policy</a>
                <span className="hidden text-gray-500 sm:inline">•</span>
                <a href="#" className="text-sm text-gray-500 hover:text-green-600">Terms of Service</a>
                <span className="hidden text-gray-500 sm:inline">•</span>
                <a href="#" className="text-sm text-gray-500 hover:text-green-600">Cookie Policy</a>
              </div>
              <p className="text-sm text-gray-500">Made with 💚 for a greener planet</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Survey Modal */}
      {showSurveyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Eco Action Survey</h3>
              <button 
                onClick={closeSurveyModal}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={submitSurvey}>
              {surveyQuestions.map(q => (
                <div key={q.id} className="mb-6">
                  <p className="mb-2 font-medium">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option, idx) => (
                      <label key={idx} className="flex items-center">
                        <input 
                          type="radio" 
                          name={`question-${q.id}`} 
                          value={option}
                          className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                        />
                        <span className="ml-2">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button 
                  type="button"
                  onClick={closeSurveyModal}
                  className="px-4 py-2 mr-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tree Planted Confirmation */}
      {showTreePlantedConfirmation && (
        <div className="fixed z-50 flex items-center p-4 text-white bg-green-600 rounded-lg shadow-lg bottom-4 right-4 animate-fadeIn">
          <CheckCircle size={20} className="mr-2" />
          <div>
            <p className="font-medium">Virtual Tree Planted!</p>
            <p className="text-sm">+50 Eco Points added to your account</p>
          </div>
        </div>
      )}
      
      {/* Chatbot Toggle Button */}
      <button 
        onClick={toggleChatbot}
        className={`fixed z-40 flex items-center justify-center p-3 text-white bg-green-600 rounded-full shadow-lg right-6 hover:bg-green-700 transition-all duration-300 ${
          showFooter ? 'bottom-20' : 'bottom-6'
        }`}
        aria-label="Chat with EcoAssistant"
      >
        <MessageSquare size={24} />
      </button>
      
      {/* Chatbot Window */}
      {showChatbot && (
        <div className={`fixed z-50 flex flex-col bg-white border border-gray-200 rounded-lg shadow-xl w-80 h-96 right-6 transition-all duration-300 ${
          showFooter ? 'bottom-32' : 'bottom-20'
        }`}>
          {/* Chat Header */}
          <div className="flex items-center justify-between p-3 text-white bg-green-600 border-b border-gray-200 rounded-t-lg">
            <div className="flex items-center">
              <Leaf size={18} className="mr-2" />
              <h3 className="font-medium">EcoAssistant</h3>
            </div>
            <button 
              onClick={toggleChatbot}
              className="p-1 text-white rounded hover:bg-green-700"
            >
              ✕
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-3 overflow-y-auto">
            <div className="space-y-3">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-3/4 p-3 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Input */}
          <form onSubmit={sendMessage} className="flex items-center p-3 border-t border-gray-200">
            <input
              type="text"
              value={userMessage}
              onChange={handleMessageChange}
              placeholder="Ask about sustainability..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <button
              type="submit"
              className="px-3 py-2 text-white bg-green-600 rounded-r-lg hover:bg-green-700"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;