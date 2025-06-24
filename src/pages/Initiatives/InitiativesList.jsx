import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaLeaf, FaSlidersH, FaUsers, 
  FaGlobe, FaCalendarAlt, FaMapMarkerAlt, FaHandsHelping 
} from 'react-icons/fa';
import InitiativeCard from '../../components/initiatives/InitiativeCard';

const InitiativesList = ({ initiatives = [], onSelectInitiative }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = ['All', 'Conservation', 'Education', 'Community', 'Sustainability', 'Cleanup', 'Agriculture'];
  const locations = ['All', 'Local', 'Regional', 'National', 'International', 'Online'];
  
  // Filter initiatives based on search term and filters
  const filteredInitiatives = initiatives.filter(initiative => {
    const matchesSearch = initiative.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         initiative.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         initiative.organizer?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || initiative.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || initiative.scope === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });
  
  // Sample data if no initiatives are provided
  const displayInitiatives = filteredInitiatives.length > 0 ? filteredInitiatives : [
    {
      id: 1,
      title: "Community Forest Restoration Project",
      description: "Join our community-driven effort to restore the local forest ecosystem that has been damaged by recent storms and human activity.",
      organizer: "Green Earth Alliance",
      startDate: "April 15, 2025",
      endDate: "April 15, 2026",
      location: "Riverside Park, North Section",
      participantsNeeded: 75,
      currentParticipants: 42,
      category: "Conservation",
      scope: "Local",
      image: "https://images.unsplash.com/photo-1552084117-56a987666449?q=80&w=1374&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Ocean Plastic Cleanup Initiative",
      description: "Work together to remove plastic waste from our beaches and educate the community about reducing plastic consumption.",
      organizer: "Blue Ocean Society",
      startDate: "May 1, 2025",
      endDate: "October 31, 2025",
      location: "Coastal Areas",
      participantsNeeded: 100,
      currentParticipants: 63,
      category: "Cleanup",
      scope: "Regional",
      image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=1374&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Urban Community Garden Network",
      description: "Create a network of community gardens in urban areas to provide fresh produce and green spaces for residents.",
      organizer: "Urban Greening Project",
      startDate: "March 1, 2025",
      endDate: "Ongoing",
      location: "Various City Locations",
      participantsNeeded: 150,
      currentParticipants: 89,
      category: "Agriculture",
      scope: "Local",
      image: "https://images.unsplash.com/photo-1445052520430-32c8ebc92fe3?q=80&w=1374&auto=format&fit=crop"
    }
  ];

  const handleSelectInitiative = (initiative) => {
    if (onSelectInitiative) {
      onSelectInitiative(initiative);
    }
  };

  return (
    <div className="relative min-h-screen pb-16 overflow-hidden">
      {/* Main content */}
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="sticky top-0 z-10 p-5 mb-10 overflow-hidden bg-white shadow-xl rounded-2xl backdrop-blur-sm bg-opacity-90"
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
                placeholder="Search initiatives by name, description, or organizer..."
                className="w-full py-3 pl-10 pr-4 text-gray-700 border-0 rounded-lg shadow-inner bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 font-medium text-green-700 transition-colors duration-300 rounded-lg bg-green-50 hover:bg-green-100"
            >
              <FaSlidersH className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            <div className="px-3 py-1 text-sm font-medium text-white rounded-full bg-gradient-to-r from-green-500 to-green-600">
              {displayInitiatives.length} initiatives available
            </div>
          </div>
          
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 mt-4 border border-green-200 border-dashed rounded-lg bg-green-50"
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
                    <label className="block mb-1 text-xs font-medium text-gray-500">Location Scope</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border-0 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {locations.map(location => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
        
        {displayInitiatives.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayInitiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="h-full"
                >
                  <InitiativeCard 
                    initiative={initiative} 
                    onClick={handleSelectInitiative} 
                  />
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center mt-12"
            >
              <button className="px-6 py-3 font-medium text-white transition-colors duration-300 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                Load More Initiatives
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-8 py-16 text-center bg-white shadow-lg rounded-2xl"
          >
            <div className="flex justify-center mb-6">
              <div className="p-6 text-green-200 rounded-full bg-green-50">
                <FaUsers className="w-16 h-16" />
              </div>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-700">No initiatives found</h3>
            <p className="max-w-md mx-auto mb-8 text-gray-500">
              Try adjusting your search or filters to find environmental initiatives that match your interests.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLocation('All');
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

export default InitiativesList;