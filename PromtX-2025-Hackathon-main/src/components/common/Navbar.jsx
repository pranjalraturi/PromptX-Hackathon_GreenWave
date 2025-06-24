import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaLeaf, FaHome, FaChartLine, FaClipboardList, 
  FaUsers, FaInfoCircle, FaBars, FaTimes, FaUserCircle,
  FaCog, FaSignOutAlt, FaUserEdit, FaList
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const profileMenuRef = useRef(null);
  
  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside profile menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation links data
  const navLinks = [
    { title: "Home", path: "/", icon: <FaHome /> },
    { title: "Dashboard", path: "/dashboard", icon: <FaChartLine /> },
    { title: "Quizzes", path: "/quizzes", icon: <FaClipboardList /> },
    { title: "Community", path: "/community", icon: <FaUsers /> },
    { title: "About", path: "/about", icon: <FaInfoCircle /> }
  ];

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle profile navigation
  const handleProfileNavigation = (path) => {
    setShowProfileMenu(false);
    // In a real app, you would navigate to the specified path
    console.log(`Navigating to: ${path}`);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-md backdrop-blur-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className={`flex items-center justify-center w-10 h-10 transition-all ${
              scrolled ? "bg-green-600 text-white" : "bg-white/20 text-white"
            } rounded-full group-hover:rotate-12`}>
              <FaLeaf className="text-xl" />
            </div>
            <span className={`text-xl font-bold transition-colors ${
              scrolled ? "text-green-800" : "text-white"
            }`}>
              GreenWaves
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-4 py-2 mx-1 transition-all rounded-full ${
                  isActive(link.path) 
                    ? scrolled 
                      ? "bg-green-100 text-green-800 font-medium"
                      : "bg-white/20 text-white font-medium" 
                    : scrolled 
                      ? "text-gray-700 hover:bg-gray-100" 
                      : "text-white/80 hover:bg-white/10"
                }`}
              >
                <span className="mr-1.5">{link.icon}</span>
                {link.title}
              </Link>
            ))}
          </div>

          {/* Profile Button */}
          <div className="items-center hidden md:flex">
            <motion.div 
              ref={profileMenuRef}
              className="relative"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-4 py-2 ml-4 font-medium transition-all rounded-full ${
                  scrolled 
                    ? "bg-green-600 text-white hover:bg-green-700" 
                    : "bg-white text-green-800 hover:bg-white/90"
                }`}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-expanded={showProfileMenu}
                aria-haspopup="true"
              >
                <FaUserCircle className="mr-2" />
                <span>Profile</span>
              </motion.button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => handleProfileNavigation('/profile')}
                        className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                      >
                        <FaUserEdit className="mr-3 text-green-600" />
                        Your Profile
                      </button>
                      <button
                        onClick={() => handleProfileNavigation('/settings')}
                        className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                      >
                        <FaCog className="mr-3 text-green-600" />
                        Settings
                      </button>
                      <button
                        onClick={() => handleProfileNavigation('/eco-actions')}
                        className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                      >
                        <FaList className="mr-3 text-green-600" />
                        My Eco Actions
                      </button>
                      <div className="border-t border-gray-100"></div>
                      <button
                        onClick={() => handleProfileNavigation('/logout')}
                        className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="mr-3 text-red-500" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-all ${
                scrolled 
                  ? "text-green-800 hover:bg-green-100" 
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-100 shadow-lg md:hidden bg-white/95 backdrop-blur-sm"
          >
            <div className="container px-4 py-2 mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center py-3 pl-3 my-1 transition-all rounded-lg ${
                    isActive(link.path)
                      ? "bg-green-100 text-green-800 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3 text-lg">{link.icon}</span>
                  {link.title}
                </Link>
              ))}
              
              <div className="pt-2 mt-2 border-t border-gray-100">
                <div className="space-y-1">
                  <button 
                    className="flex items-center w-full py-3 pl-3 my-1 font-medium text-white transition-all bg-green-600 rounded-lg hover:bg-green-700"
                    onClick={() => handleProfileNavigation('/profile')}
                  >
                    <FaUserCircle className="mr-3 text-lg" />
                    Your Profile
                  </button>
                  <button 
                    className="flex items-center w-full py-3 pl-3 my-1 text-gray-700 transition-all rounded-lg hover:bg-gray-100"
                    onClick={() => handleProfileNavigation('/settings')}
                  >
                    <FaCog className="mr-3 text-lg text-green-600" />
                    Settings
                  </button>
                  <button 
                    className="flex items-center w-full py-3 pl-3 my-1 text-gray-700 transition-all rounded-lg hover:bg-gray-100"
                    onClick={() => handleProfileNavigation('/eco-actions')}
                  >
                    <FaList className="mr-3 text-lg text-green-600" />
                    My Eco Actions
                  </button>
                  <button 
                    className="flex items-center w-full py-3 pl-3 my-1 text-gray-700 transition-all rounded-lg hover:bg-gray-100"
                    onClick={() => handleProfileNavigation('/logout')}
                  >
                    <FaSignOutAlt className="mr-3 text-lg text-red-500" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;