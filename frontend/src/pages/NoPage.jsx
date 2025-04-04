import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NoPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center bg-white p-10 rounded-2xl shadow-xl"
    >
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl mb-6 text-gray-700">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-2xl transition-colors">
          Go Home
        </button>
      </Link>
    </motion.div>
  </div>
  )
}

export default NoPage