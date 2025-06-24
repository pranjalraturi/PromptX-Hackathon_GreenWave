import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import LoginForm from '../../components/auth/LoginForm';

const Login = () => {
  return (
    <div 
      className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1470&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-green-900/70 to-green-600/60 backdrop-blur-sm"></div>
      
      {/* Decorative background elements */}
      <motion.img 
        src="https://images.unsplash.com/photo-1580096627820-9f20f92fb79b?q=80&w=300&auto=format&fit=crop"
        alt=""
        className="absolute z-0 w-40 h-40 rounded-full opacity-20 -top-10 -left-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.img 
        src="https://images.unsplash.com/photo-1428364281223-a76e08c6f3b7?q=80&w=300&auto=format&fit=crop"
        alt=""
        className="absolute z-0 w-48 h-48 rounded-full opacity-20 bottom-20 -right-20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
      />
      <motion.img 
        src="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=300&auto=format&fit=crop"
        alt=""
        className="absolute z-0 w-32 h-32 rounded-full opacity-15 bottom-10 left-20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", delay: 1 }}
      />
      <motion.img 
        src="https://images.unsplash.com/photo-1500828131278-8de6878641b8?q=80&w=300&auto=format&fit=crop"
        alt=""
        className="absolute z-0 rounded-full w-36 h-36 opacity-15 top-20 right-40"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse", delay: 0.7 }}
      />
      
      <div className="relative z-10 flex flex-col w-full max-w-7xl min-h-[600px] overflow-hidden shadow-2xl md:flex-row rounded-3xl">
        {/* Left side - Image/Brand Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between w-full p-12 text-white md:w-1/2 bg-gradient-to-br from-green-600 to-green-800 md:p-16"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1374&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay"
          }}
        >
          <div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <FaLeaf className="text-4xl" />
              <h2 className="text-3xl font-bold">GreenWaves</h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-20"
            >
              <h1 className="mb-8 text-5xl font-bold md:text-6xl">Welcome Back</h1>
              <p className="text-2xl opacity-90">
                Continue your journey toward a sustainable future. Together, we can make a difference.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12"
          >
            <p className="text-lg opacity-80">
              "The greatest threat to our planet is the belief that someone else will save it."
              <br /><span className="italic">— Robert Swan</span>
            </p>
          </motion.div>
        </motion.div>
        
        {/* Right side - Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full p-12 bg-white md:w-1/2 md:p-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-lg mx-auto"
          >
            <h2 className="mb-10 text-4xl font-bold text-gray-800">Login to your account</h2>
            
            <LoginForm />
            
            <div className="mt-10 text-center">
              <p className="text-lg text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-green-600 hover:text-green-700">
                  Sign up
                </Link>
              </p>
              
              <Link to="/forgot-password" className="block mt-4 text-base text-green-600 hover:text-green-700">
                Forgot your password?
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;