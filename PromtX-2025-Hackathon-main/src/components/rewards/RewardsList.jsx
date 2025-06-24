import React from 'react';
import RewardCard from './RewardCard';

const RewardsList = ({ rewards }) => {
  return (
    <div className="rewards-list">
      {rewards.map(reward => (
        <RewardCard key={reward.id} reward={reward} />
      ))}
    </div>
  );
};

export default RewardsList;