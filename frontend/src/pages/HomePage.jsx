import React from 'react';
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4">
      <div className="text-center bg-gray-900 p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-5xl border border-gray-700">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6 drop-shadow-lg">
          Online IDE
        </h1>
        <p className="text-base md:text-lg mb-8 text-gray-300 leading-relaxed">
          Code, Compile, and Run your projects online with real-time collaboration and powerful tools. Enjoy a smooth and responsive coding experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:shadow-xl transition-shadow">
            <h2 className="text-xl md:text-2xl font-bold text-green-400 mb-2">New Project</h2>
            <p className="text-gray-400 mb-4">Create a fresh project and start coding from scratch.</p>
            <Link to="/NewProject">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition w-full">
                Start New Project
              </button>
            </Link>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:shadow-xl transition-shadow">
            <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-2">Existing Project</h2>
            <p className="text-gray-400 mb-4">Open and continue working on your saved projects.</p>
            <Link to="/projects">
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition w-full">
                Open Project
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
