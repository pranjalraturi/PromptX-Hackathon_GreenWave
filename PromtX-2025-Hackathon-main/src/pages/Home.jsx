import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import '../assets/styles/global.css';

// Import icons
import { 
  FaLeaf, 
  FaTree, 
  FaAward, 
  FaChartLine, 
  FaHandHoldingHeart, 
  FaSeedling, 
  FaRegLightbulb,
  FaUsers
} from "react-icons/fa";

const CountUp = ({ end, duration = 2.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    if (isInView) {
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);
  
  return <span ref={ref}>{count}</span>;
};

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  
  // Parallax and animation values
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.85]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 100]);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden text-gray-900 bg-gradient-to-b from-green-50 to-green-100">
      {/* Enhanced Hero Section with Parallax and Scale Effects */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative flex items-center justify-center h-screen overflow-hidden"
      >
        <div 
          className="absolute inset-0 z-0 bg-center bg-cover"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1920')",
            transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0005})`,
            filter: "brightness(0.65) saturate(1.2)",
          }}
        >
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 to-green-900/70"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1 className="text-6xl font-bold tracking-tight text-white md:text-8xl drop-shadow-xl font-display">
              Green<span className="text-green-400">Waves</span>
            </h1>
            
            <div className="w-24 h-1 mx-auto my-6 rounded-full bg-gradient-to-r from-green-400 to-teal-500"></div>
            
            <p className="max-w-3xl mx-auto mt-6 text-xl font-light text-white md:text-3xl drop-shadow-md">
              Creating ripples of environmental impact, 
              <span className="block mt-2">one action at a time.</span>
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-10"
          >
            <NavLink to="/register">
              <button className="px-10 py-5 text-lg font-bold text-white transition duration-500 transform rounded-full shadow-lg bg-gradient-to-r from-green-500 to-teal-500 hover:shadow-green-400/30 hover:shadow-xl hover:scale-105 group">
                <span className="flex items-center">
                  Join The Movement
                  <FaSeedling className="ml-2 transition-transform duration-300 transform group-hover:rotate-12" />
                </span>
              </button>
            </NavLink>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 12, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute transform -translate-x-1/2 bottom-12 left-1/2"
          >
            <svg className="w-10 h-10 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Vision Statement with Floating Elements */}
      <section className="relative px-4 overflow-hidden py-28">
        <div className="absolute w-40 h-40 bg-green-100 rounded-full opacity-50 -top-20 -left-20"></div>
        <div className="absolute w-64 h-64 bg-teal-100 rounded-full top-40 -right-20 opacity-60"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-green-800 bg-green-100 rounded-full">OUR VISION</span>
          <h2 className="mb-8 text-4xl font-bold leading-tight text-green-800">
            "The Earth does not belong to us; 
            <span className="block mt-2">we belong to the Earth."</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-700">
            At GreenWaves, we believe every small action creates ripples of change. 
            Our mission is to empower individuals and communities to make sustainable choices 
            that collectively transform our planet's future.
          </p>
        </motion.div>
      </section>

      {/* Enhanced Stats Section - Animated counting with better visuals */}
      <section className="relative py-24 overflow-hidden text-white bg-gradient-to-r from-green-700 to-green-800">
        {/* Decorative wave pattern */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto text-green-50 opacity-10">
            <path fill="currentColor" fillOpacity="1" d="M0,192L48,186.7C96,181,192,171,288,186.7C384,203,480,245,576,234.7C672,224,768,160,864,138.7C960,117,1056,139,1152,170.7C1248,203,1344,245,1392,266.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        
        <div className="container relative z-10 px-4 mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-3xl font-bold text-center"
          >
            Our Impact So Far
          </motion.h2>
          
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 rounded-xl bg-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-green-800 bg-green-200 rounded-full">
                <FaTree className="text-2xl" />
              </div>
              <h3 className="mb-2 text-5xl font-bold">
                <CountUp end={10} />+
              </h3>
              <p className="text-xl">Trees Planted</p>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-8 rounded-xl bg-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-green-800 bg-green-200 rounded-full">
                <FaUsers className="text-2xl" />
              </div>
              <h3 className="mb-2 text-5xl font-bold">
                <CountUp end={50} />+
              </h3>
              <p className="text-xl">Active Users</p>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="p-8 rounded-xl bg-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-green-800 bg-green-200 rounded-full">
                <FaRegLightbulb className="text-2xl" />
              </div>
              <h3 className="mb-2 text-5xl font-bold">
                <CountUp end={1} />+
              </h3>
              <p className="text-xl">Countries Reached</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section with Better Animation and Design */}
      <section className="relative px-4 py-32 overflow-hidden bg-white">
        {/* Decorative circles */}
        <div className="absolute rounded-full -bottom-32 -right-32 w-96 h-96 bg-green-50 opacity-70"></div>
        <div className="absolute w-40 h-40 rounded-full top-20 -left-20 bg-teal-50 opacity-60"></div>
        
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20 text-center"
          >
            <span className="inline-block px-4 py-1 mb-4 text-sm font-medium text-green-800 bg-green-100 rounded-full">OUR ECOSYSTEM</span>
            <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Innovation for Impact
            </h2>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-10 md:grid-cols-3"
          >
            {/* Feature 1 */}
            <motion.div 
              variants={itemVariants}
              className="p-8 transition-all duration-500 transform shadow-lg bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-xl hover:-translate-y-2 group"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-white transition-all duration-300 bg-green-600 rounded-full group-hover:bg-green-500 group-hover:scale-110">
                <FaTree className="text-2xl" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-center text-green-800">AI-Powered Verification</h3>
              <p className="text-center text-gray-700">
                Our cutting-edge AI technology verifies your environmental actions, 
                ensuring authenticity and building trust in our ecosystem.
              </p>
              <div className="flex justify-center mt-6">
                <span className="inline-block px-4 py-2 text-sm font-medium text-green-600 transition-colors duration-300 border border-green-600 rounded-full group-hover:bg-green-600 group-hover:text-white">Learn more</span>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              variants={itemVariants}
              className="p-8 transition-all duration-500 transform shadow-lg bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-xl hover:-translate-y-2 group"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-white transition-all duration-300 bg-green-600 rounded-full group-hover:bg-green-500 group-hover:scale-110">
                <FaAward className="text-2xl" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-center text-green-800">Gamified Experience</h3>
              <p className="text-center text-gray-700">
                Turn sustainability into a rewarding journey. Complete challenges, 
                earn points, and unlock badges as you progress on your green path.
              </p>
              <div className="flex justify-center mt-6">
                <span className="inline-block px-4 py-2 text-sm font-medium text-green-600 transition-colors duration-300 border border-green-600 rounded-full group-hover:bg-green-600 group-hover:text-white">Learn more</span>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              variants={itemVariants}
              className="p-8 transition-all duration-500 transform shadow-lg bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-xl hover:-translate-y-2 group"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-white transition-all duration-300 bg-green-600 rounded-full group-hover:bg-green-500 group-hover:scale-110">
                <FaChartLine className="text-2xl" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-center text-green-800">Eco-Card & Rewards</h3>
              <p className="text-center text-gray-700">
                Build your sustainability score and redeem exclusive eco-friendly rewards 
                from our network of responsible business partners.
              </p>
              <div className="flex justify-center mt-6">
                <span className="inline-block px-4 py-2 text-sm font-medium text-green-600 transition-colors duration-300 border border-green-600 rounded-full group-hover:bg-green-600 group-hover:text-white">Learn more</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials with Card Rotation Effect */}
      <section className="px-4 py-28 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <span className="inline-block px-4 py-1 mb-4 text-sm font-medium text-green-800 bg-green-100 rounded-full">TESTIMONIALS</span>
            <h2 className="text-4xl font-bold text-gray-900">
              Voices of Change
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ rotateY: 5, scale: 1.02 }}
            className="p-10 bg-white border border-green-100 shadow-xl rounded-2xl"
          >
            <div className="flex mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <p className="mb-6 text-xl italic leading-relaxed text-gray-700">
              "The most profound joy comes from leading with purpose. GreenWaves has given 
              me a platform to translate my environmental passion into measurable impact. 
              Every action I take ripples outward, inspiring others in my community."
            </p>
            <div className="flex items-center">
              <div className="flex items-center justify-center mr-4 overflow-hidden bg-green-100 rounded-full w-14 h-14">
                <FaHandHoldingHeart className="text-2xl text-green-600" />
              </div>
              <div>
                <h4 className="font-bold">Vansh Goyal</h4>
                <p className="text-green-600">Community Leader, Dehradun</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section with Animated Background and Better Visual Design */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-900"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
            opacity: 0.3
          }}
        ></div>
        
        {/* Animated particles effect */}
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-white rounded-full opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl px-4 mx-auto text-center"
        >
          <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-white rounded-full bg-white/20 backdrop-blur-sm">JOIN US</span>
          <h2 className="mb-8 text-4xl font-bold leading-tight text-white md:text-5xl">
            "In nature's economy, the currency is not money,
            <span className="block mt-2">it's life."</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-xl text-white opacity-90">
            Join thousands of changemakers who are rewriting our planet's future.
            Your journey starts with a single step.
          </p>
          <NavLink to="/register">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 text-lg font-bold text-green-800 transition duration-300 transform bg-white rounded-full shadow-xl hover:shadow-green-300/30 hover:shadow-2xl group"
            >
              <span className="flex items-center">
                Begin Your Green Journey
                <FaSeedling className="ml-2 transition-transform duration-300 transform group-hover:rotate-12" />
              </span>
            </motion.button>
          </NavLink>
        </motion.div>
      </section>

      {/* Enhanced Footer with Better Wave Animation and Layout */}
      <footer className="relative pt-24 pb-10 overflow-hidden text-white bg-gradient-to-br from-green-800 to-green-900">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="grid grid-cols-1 gap-10 mb-16 md:grid-cols-4">
            <div className="text-center md:text-left">
              <h3 className="mb-4 text-2xl font-bold">GreenWaves</h3>
              <p className="opacity-75">
                Together, we can turn the tide on climate change.
                One wave of action at a time.
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <h4 className="mb-4 text-xl font-semibold">Features</h4>
              <ul className="space-y-2 opacity-75">
                <li>AI Verification</li>
                <li>Eco Rewards</li>
                <li>Community Challenges</li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <h4 className="mb-4 text-xl font-semibold">Resources</h4>
              <ul className="space-y-2 opacity-75">
                <li>Blog</li>
                <li>Success Stories</li>
                <li>Research</li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <h4 className="mb-4 text-xl font-semibold">Connect</h4>
              <div className="flex justify-center mb-6 space-x-6 md:justify-start">
                <FaLeaf className="text-2xl transition-colors cursor-pointer hover:text-green-400" />
                <FaHandHoldingHeart className="text-2xl transition-colors cursor-pointer hover:text-green-400" />
                <FaTree className="text-2xl transition-colors cursor-pointer hover:text-green-400" />
              </div>
              <p className="opacity-75">info@greenwaves.eco</p>
            </div>
          </div>
          
          <div className="pt-8 text-sm text-center border-t border-white/20">
            <p className="opacity-75">
              © {new Date().getFullYear()} GreenWaves. All rights reserved.
            </p>
          </div>
        </div>
        
        {/* Enhanced animated wave effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, -50, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 20, 
              ease: "linear" 
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto opacity-10" style={{ width: "200%" }}>
              <path fill="#ffffff" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,224C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Home;