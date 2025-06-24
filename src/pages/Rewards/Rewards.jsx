import React, { useState, useEffect } from 'react';
import { FaTrophy, FaGift, FaHistory, FaMedal, FaLeaf } from 'react-icons/fa';

const Rewards = () => {
  const [points, setPoints] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [pointHistory, setPointHistory] = useState([
    { id: 1, action: "Welcome Bonus", points: 50, date: "2023-05-10" },
  ]);
  const [achievements, setAchievements] = useState([
    { id: 1, name: "First Login", points: 10, completed: false, icon: "🔑", category: "Onboarding" },
    { id: 2, name: "Complete Profile", points: 25, completed: false, icon: "👤", category: "Onboarding" },
    { id: 3, name: "First Purchase", points: 50, completed: false, icon: "🛒", category: "Shopping" },
    { id: 4, name: "Refer a Friend", points: 100, completed: false, icon: "👥", category: "Community" },
    { id: 5, name: "Weekly Streak", points: 75, completed: false, icon: "🔥", category: "Engagement", progress: 3, total: 7 }
  ]);
  const [rewards, setRewards] = useState([
    { id: 1, name: "5% Discount", points: 100, claimed: false },
    { id: 2, name: "Free Shipping", points: 200, claimed: false },
    { id: 3, name: "Premium Item", points: 500, claimed: false },
    { id: 4, name: "VIP Status", points: 1000, claimed: false }
  ]);

  const completeAchievement = (id) => {
    const updatedAchievements = achievements.map(achievement => {
      if (achievement.id === id && !achievement.completed) {
        const earnedPoints = achievement.points;
        setPoints(prevPoints => prevPoints + earnedPoints);
        
        // Add to point history
        setPointHistory(prev => [
          { id: Date.now(), action: `Completed: ${achievement.name}`, points: earnedPoints, date: new Date().toISOString().split('T')[0] },
          ...prev
        ]);
        
        return { ...achievement, completed: true };
      }
      return achievement;
    });
    
    setAchievements(updatedAchievements);
  };

  const initiateRewardClaim = (reward) => {
    setSelectedReward(reward);
    setShowConfirmation(true);
  };

  const confirmRewardClaim = () => {
    if (selectedReward && !selectedReward.claimed && points >= selectedReward.points) {
      setPoints(prevPoints => prevPoints - selectedReward.points);
      
      // Add to point history
      setPointHistory(prev => [
        { id: Date.now(), action: `Claimed: ${selectedReward.name}`, points: -selectedReward.points, date: new Date().toISOString().split('T')[0] },
        ...prev
      ]);
      
      const updatedRewards = rewards.map(r => {
        if (r.id === selectedReward.id) {
          return { ...r, claimed: true };
        }
        return r;
      });
      
      setRewards(updatedRewards);
    }
    setShowConfirmation(false);
  };

  const cancelRewardClaim = () => {
    setShowConfirmation(false);
    setSelectedReward(null);
  };

  const getRewardTier = (pointValue) => {
    if (pointValue >= 500) return { name: "Platinum", color: "text-purple-600" };
    if (pointValue >= 200) return { name: "Gold", color: "text-yellow-600" };
    if (pointValue >= 100) return { name: "Silver", color: "text-gray-500" };
    return { name: "Bronze", color: "text-amber-700" };
  };

  return (
    <div className="max-w-5xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Eco Rewards Program</h1>
        <div className="inline-block px-6 py-3 rounded-full shadow-md bg-gradient-to-r from-green-400 to-blue-500">
          <span className="text-2xl font-bold text-white">{points} Points</span>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Current Tier: <span className={`font-bold ${getRewardTier(points).color}`}>{getRewardTier(points).name}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-1 p-4 rounded-lg shadow-sm bg-gray-50">
          <h2 className="flex items-center mb-4 text-xl font-bold text-gray-700">
            <FaTrophy className="mr-2 text-yellow-500" /> Achievements
          </h2>
          
          {/* Group achievements by category */}
          {['Onboarding', 'Shopping', 'Community', 'Engagement'].map(category => (
            <div key={category} className="mb-4">
              <h3 className="mb-2 font-medium text-gray-600">{category}</h3>
              <ul className="space-y-3">
                {achievements
                  .filter(a => a.category === category)
                  .map(achievement => (
                    <li key={achievement.id} className="flex items-center justify-between p-3 transition bg-white rounded shadow-sm hover:shadow">
                      <div className="flex items-center">
                        <span className="mr-2 text-xl">{achievement.icon}</span>
                        <div>
                          <span className="font-medium text-gray-800">{achievement.name}</span>
                          <span className="ml-2 text-sm text-blue-600">+{achievement.points} points</span>
                          
                          {/* Progress bar for achievements with progress */}
                          {achievement.progress && achievement.total && (
                            <div className="w-full h-2 mt-1 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-green-500 rounded-full" 
                                style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                              ></div>
                              <div className="mt-1 text-xs text-gray-500">
                                {achievement.progress}/{achievement.total}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => completeAchievement(achievement.id)}
                        disabled={achievement.completed}
                        className={`px-3 py-1 rounded text-sm ${
                          achievement.completed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        {achievement.completed ? 'Completed' : 'Complete'}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="col-span-1 p-4 rounded-lg shadow-sm bg-gray-50">
          <h2 className="flex items-center mb-4 text-xl font-bold text-gray-700">
            <FaGift className="mr-2 text-purple-500" /> Available Rewards
          </h2>
          <ul className="space-y-3">
            {rewards.map(reward => {
              const tier = getRewardTier(reward.points);
              return (
                <li key={reward.id} className="flex items-center justify-between p-3 transition bg-white rounded shadow-sm hover:shadow">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className={`text-sm font-bold ${tier.color} mr-1`}>[{tier.name}]</span>
                      <span className="font-medium text-gray-800">{reward.name}</span>
                    </div>
                    <span className="text-sm text-red-600">{reward.points} points required</span>
                  </div>
                  <button
                    onClick={() => initiateRewardClaim(reward)}
                    disabled={reward.claimed || points < reward.points}
                    className={`px-3 py-1 rounded text-sm ${
                      reward.claimed
                        ? 'bg-green-100 text-green-700'
                        : points < reward.points
                        ? 'bg-gray-300 text-gray-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {reward.claimed ? 'Claimed' : 'Claim'}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="col-span-1 p-4 rounded-lg shadow-sm bg-gray-50">
          <h2 className="flex items-center mb-4 text-xl font-bold text-gray-700">
            <FaHistory className="mr-2 text-blue-500" /> Points History
          </h2>
          <ul className="space-y-2 overflow-y-auto max-h-80">
            {pointHistory.map(record => (
              <li key={record.id} className="flex items-center justify-between p-2 text-sm bg-white rounded shadow-sm">
                <div>
                  <div className="font-medium text-gray-800">{record.action}</div>
                  <div className="text-xs text-gray-500">{record.date}</div>
                </div>
                <span className={`font-medium ${record.points >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {record.points >= 0 ? '+' : ''}{record.points}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-xl font-bold">Confirm Reward Claim</h3>
            <p className="mb-6">Are you sure you want to claim "{selectedReward.name}" for {selectedReward.points} points?</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={cancelRewardClaim}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={confirmRewardClaim}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rewards;