import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const InitiativeCard = ({ initiative, onClick }) => {
  const participationPercentage = Math.round((initiative.currentParticipants / initiative.participantsNeeded) * 100);
  
  return (
    <div 
      onClick={() => onClick && onClick(initiative)}
      className="h-full overflow-hidden transition-all duration-300 transform bg-white shadow-lg hover:shadow-xl rounded-2xl hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={initiative.image} 
          alt={initiative.title} 
          className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-110"
        />
        <div className="absolute top-0 left-0 m-3">
          <span className="px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r from-green-500 to-green-600">
            {initiative.category}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-center p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="w-full bg-gray-300 rounded-full h-1.5 bg-opacity-50">
            <div 
              className="bg-green-400 h-1.5 rounded-full" 
              style={{ width: `${participationPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="mb-2 text-xl font-bold text-gray-800">{initiative.title}</h3>
        <p className="mb-4 text-sm text-gray-500">Organized by {initiative.organizer}</p>
        <p className="mb-4 text-gray-600 line-clamp-3">{initiative.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-green-500" />
            <span className="truncate">{initiative.startDate}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-green-500" />
            <span className="truncate">{initiative.scope || initiative.location}</span>
          </div>
          <div className="flex items-center">
            <FaUsers className="mr-2 text-green-500" />
            <span>
              {initiative.currentParticipants}/{initiative.participantsNeeded} joined
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <span className="inline-flex items-center text-sm font-medium text-green-600">
            View Details 
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default InitiativeCard;