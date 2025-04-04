import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-900 text-white p-4 shadow-lg border-b border-gray-700">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Cody</h1>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8">
                    <Link to="/" className="hover:text-green-400 transition-colors">Home</Link>
                    <Link to="/projects" className="hover:text-green-400 transition-colors">Existing</Link>
                    <Link to="/logout" className="hover:text-green-400 transition-colors">Logout</Link>
                    <Link to="/coding" className="hover:text-green-400 transition-colors">Editor</Link>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden flex flex-col items-center space-y-4 mt-4 bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700">
                    <Link to="/" className="hover:text-green-400 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/logout" className="hover:text-green-400 transition-colors">Logout</Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
