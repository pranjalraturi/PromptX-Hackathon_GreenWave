import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaLeaf, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft, 
  FaShare, FaBookmark, FaGlobe, FaHandsHelping, FaChartLine
} from 'react-icons/fa';

const InitiativeDetail = ({ initiative }) => {
  const [isInterested, setIsInterested] = useState(false);
  
  // Default values for the initiative if not provided
  const {
    id = "1",
    title = "Community Forest Restoration Project",
    description = "Join our community-driven effort to restore the local forest ecosystem that has been damaged by recent storms and human activity. Together, we'll plant native trees, remove invasive species, and create a sustainable habitat for local wildlife.",
    longDescription = `The Community Forest Restoration Project aims to revitalize 5 acres of damaged woodland on the north side of our city. This area was severely impacted by the storms last year, and invasive species have begun to take over, threatening the native ecosystem.

Our initiative will unfold in three phases over the next 12 months:

Phase 1: Site assessment and planning (2 months)
Phase 2: Invasive species removal and initial plantings (6 months)
Phase 3: Ongoing maintenance and additional plantings (4 months)

By participating, you'll learn about forest ecology, native plant species, and sustainable land management practices while making a tangible difference in our community's green space.`,
    organizer = "Green Earth Alliance",
    startDate = "April 15, 2025",
    endDate = "April 15, 2026",
    location = "Riverside Park, North Section",
    participantsNeeded = 75,
    currentParticipants = 42,
    impactMetrics = [
      { label: "Trees Planted", value: "500+", icon: <FaLeaf /> },
      { label: "Land Restored", value: "5 acres", icon: <FaGlobe /> },
      { label: "Carbon Offset", value: "25 tons/year", icon: <FaChartLine /> }
    ],
    upcomingEvents = [
      { date: "April 15, 2025", name: "Kickoff Meeting", location: "Community Center" },
      { date: "April 22, 2025", name: "First Planting Day", location: "Riverside Park" },
      { date: "May 5, 2025", name: "Invasive Species Removal Workshop", location: "Riverside Park" }
    ],
    howToParticipate = [
      "Register for the initiative using the button below",
      "Attend the kickoff meeting to learn about the project goals and timeline",
      "Sign up for specific volunteer days through our online calendar",
      "Bring appropriate clothing and footwear for outdoor work",
      "No prior experience necessary - training will be provided!"
    ],
    requirements = [
      "Must be 16 years or older (or accompanied by an adult)",
      "Ability to commit to at least 3 volunteer sessions",
      "Willingness to work outdoors in various weather conditions",
      "Basic physical ability for activities like planting and weeding"
    ],
    image = "https://images.unsplash.com/photo-1552084117-56a987666449?q=80&w=1374&auto=format&fit=crop"
  } = initiative || {};
  
  const participationPercentage = Math.round((currentParticipants / participantsNeeded) * 100);

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-b from-green-50 to-green-100">
      {/* Decorative background elements */}
      <div className="absolute right-0 top-20 -z-10 opacity-10">
        <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
          <defs>
            <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="4" className="text-green-800" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#pattern-circles)" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 -z-10 opacity-10">
        <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
          <defs>
            <pattern id="pattern-squares" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="8" y="8" width="4" height="4" className="text-green-800" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#pattern-squares)" />
        </svg>
      </div>
      
      <div className="container max-w-5xl px-4 py-8 mx-auto">
        {/* Back to initiatives link */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/initiatives" className="inline-flex items-center mb-6 text-sm font-medium text-green-700 hover:text-green-800">
            <FaArrowLeft className="mr-2" />
            Back to Initiatives
          </Link>
        </motion.div>
        
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden bg-white shadow-xl rounded-3xl"
        >
          <div className="relative overflow-hidden h-80 sm:h-96">
            <img 
              src={image} 
              alt={title} 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            
            <div className="absolute flex space-x-2 top-4 right-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsInterested(!isInterested)}
                className="flex items-center justify-center w-10 h-10 text-white transition-all duration-200 bg-white rounded-full bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30"
              >
                <FaBookmark className={isInterested ? "text-yellow-400" : ""} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-10 h-10 text-white transition-all duration-200 bg-white rounded-full bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30"
              >
                <FaShare />
              </motion.button>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-0 left-0 w-full p-6 text-white sm:p-8"
            >
              <div className="flex items-center mb-3">
                <span className="px-3 py-1 text-xs font-medium bg-green-600 rounded-full">
                  Active Initiative
                </span>
              </div>
              <h1 className="mb-2 text-3xl font-bold sm:text-4xl text-shadow">{title}</h1>
              <p className="mb-4 text-green-100">Organized by {organizer}</p>
              
              <div className="flex items-center">
                <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2 bg-opacity-50">
                  <div className="bg-green-400 h-2.5 rounded-full" style={{ width: `${participationPercentage}%` }}></div>
                </div>
                <span className="text-sm whitespace-nowrap">{currentParticipants}/{participantsNeeded} participants</span>
              </div>
            </motion.div>
          </div>
          
          {/* Initiative details */}
          <div className="p-6 sm:p-8">
            {/* Key info cards */}
            <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex items-center p-4 border border-green-100 bg-green-50 rounded-xl"
              >
                <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-100 rounded-full">
                  <FaCalendarAlt className="text-2xl text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="text-lg font-bold text-gray-800">{startDate} - {endDate}</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center p-4 border border-green-100 bg-green-50 rounded-xl"
              >
                <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-100 rounded-full">
                  <FaMapMarkerAlt className="text-2xl text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-lg font-bold text-gray-800">{location}</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex items-center p-4 border border-green-100 bg-green-50 rounded-xl"
              >
                <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-100 rounded-full">
                  <FaUsers className="text-2xl text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Participants</p>
                  <p className="text-lg font-bold text-gray-800">{currentParticipants} of {participantsNeeded}</p>
                </div>
              </motion.div>
            </div>
            
            {/* Description */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 mr-3 bg-green-600 rounded-full">
                  <FaLeaf className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">About This Initiative</h2>
              </div>
              
              <p className="mb-4 leading-relaxed text-gray-700">{description}</p>
              <p className="leading-relaxed text-gray-700 whitespace-pre-line">{longDescription}</p>
            </motion.div>
            
            {/* Environmental Impact */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="p-6 mb-8 border border-green-200 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl"
            >
              <h3 className="mb-6 text-xl font-bold text-gray-800">Environmental Impact</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {impactMetrics.map((metric, index) => (
                  <div key={index} className="flex flex-col items-center p-5 text-center bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-12 h-12 mb-3 text-white bg-green-600 rounded-full">
                      {metric.icon}
                    </div>
                    <p className="mb-1 text-2xl font-bold text-gray-800">{metric.value}</p>
                    <p className="text-sm text-gray-600">{metric.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Upcoming Events */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 mr-3 bg-green-600 rounded-full">
                  <FaCalendarAlt className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className="flex p-4 bg-white border border-green-100 shadow-sm rounded-xl"
                  >
                    <div className="flex flex-col items-center justify-center flex-shrink-0 mr-4 border border-green-200 rounded-lg w-14 h-14 bg-green-50">
                      <span className="text-xs font-medium text-green-700">
                        {event.date.split(' ')[0]}
                      </span>
                      <span className="text-lg font-bold text-green-800">
                        {event.date.split(' ')[1].replace(',', '')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{event.name}</h4>
                      <p className="text-sm text-gray-600">
                        <FaMapMarkerAlt className="inline mr-1" />
                        {event.location}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* How to Participate */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 mr-3 bg-green-600 rounded-full">
                  <FaHandsHelping className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">How to Participate</h2>
              </div>
              
              <ol className="pl-6 mb-6 space-y-2">
                {howToParticipate.map((step, index) => (
                  <li key={index} className="leading-relaxed text-gray-700">
                    <span className="font-medium text-green-700">{index + 1}.</span> {step}
                  </li>
                ))}
              </ol>
              
              <div className="p-4 mb-6 border rounded-lg bg-amber-50 border-amber-200">
                <h4 className="mb-2 font-bold text-amber-800">Requirements</h4>
                <ul className="pl-5 space-y-1 list-disc">
                  {requirements.map((req, index) => (
                    <li key={index} className="text-amber-700">{req}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center flex-1 px-6 py-4 text-lg font-bold text-white transition-colors duration-300 shadow-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl"
              >
                Join This Initiative
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center flex-1 px-6 py-4 text-lg font-bold text-green-600 transition-colors duration-300 border-2 border-green-500 sm:flex-none hover:bg-green-50 rounded-xl"
              >
                Contact Organizer
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InitiativeDetail;