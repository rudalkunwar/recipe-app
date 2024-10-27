import React, { useState, useEffect } from 'react';
import { FaHome, FaBook, FaInfoCircle, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar() {
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  let lastScrollY = 0;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Update scroll visibility
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    
    // Update background opacity
    setIsScrolled(currentScrollY > 20);
    lastScrollY = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { icon: <FaHome className="text-xl" />, text: 'Home', path: '/' },
    { icon: <FaBook className="text-xl" />, text: 'Recipe', path: '/recipe' },
    { icon: <FaInfoCircle className="text-xl" />, text: 'About', path: '/about' }
  ];

  return (
    <nav 
      className={`
        fixed w-full z-50 transition-all duration-300
        ${visible ? 'translate-y-0' : '-translate-y-full'}
        ${isScrolled ? 'bg-gray-900/95 backdrop-blur shadow-lg' : 'bg-gradient-to-b from-gray-900 to-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-white hover:text-blue-400 transition-all duration-200"
          >
            Recipe App
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-8">
            {navLinks.map(({ icon, text, path }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center gap-2 text-white hover:text-blue-400 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10"
              >
                {icon}
                <span>{text}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            sm:hidden transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'max-h-screen pb-4' : 'max-h-0'}
            overflow-hidden
          `}
        >
          <div className="space-y-2 pt-2">
            {navLinks.map(({ icon, text, path }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center gap-3 text-white hover:text-blue-400 px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {icon}
                <span>{text}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;