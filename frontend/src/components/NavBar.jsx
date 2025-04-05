import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkStyles =
    "px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition duration-200";

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Cody
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className={navLinkStyles}>
            Home
          </Link>
          <Link to="/projects" className={navLinkStyles}>
            Existing
          </Link>
          <Link to="/logout" className={navLinkStyles}>
            Logout
          </Link>
          <Link to="/coding" className={navLinkStyles}>
            Editor
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-2 mt-4 bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700">
          <Link to="/" className={navLinkStyles} onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/projects" className={navLinkStyles} onClick={() => setIsOpen(false)}>
            Existing
          </Link>
          <Link to="/coding" className={navLinkStyles} onClick={() => setIsOpen(false)}>
            Editor
          </Link>
          <Link to="/logout" className={navLinkStyles} onClick={() => setIsOpen(false)}>
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
