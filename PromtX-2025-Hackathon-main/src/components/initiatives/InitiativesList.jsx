import React from 'react';
import InitiativeCard from './InitiativeCard';

const InitiativesList = ({ initiatives }) => {
  return (
    <div className="initiatives-list">
      {initiatives.length > 0 ? (
        initiatives.map((initiative) => (
          <InitiativeCard key={initiative.id} initiative={initiative} />
        ))
      ) : (
        <p>No initiatives available.</p>
      )}
    </div>
  );
};

export default InitiativesList;