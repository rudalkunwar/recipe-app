import React, { useState, useEffect } from 'react';
import { FaHome, FaBook, FaInfoCircle, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar() {
    const [visible, setVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    let lastScrollY = 0;

    const handleScroll = () => {
        if (typeof window !== 'undefined') {
            const currentScrollY = window.scrollY;

            // Compare current scroll position with the last position
            if (currentScrollY > lastScrollY) {
                setVisible(false); // Scrolling down
            } else {
                setVisible(true); // Scrolling up
            }
            lastScrollY = currentScrollY;
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`flex justify-between items-center py-4 px-6 fixed w-full z-20 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'} bg-gradient-to-b from-gray-900 to-transparent backdrop-blur-sm`}>
            {/* Logo Section */}
            <div className="text-2xl font-bold text-white">
                <Link className="flex items-center gap-2 p-2 rounded-lg transition-transform transform hover:scale-110" to="/">
                    Recipe App
                </Link>
            </div>

            {/* Menu Section - For large screens */}
            <ul className="hidden gap-8 text-white text-lg sm:flex">
                <li>
                    <Link className="flex items-center gap-2 hover:text-blue-300 p-2 rounded-lg transition-transform transform hover:scale-110" to="/">
                        <FaHome className="text-xl" /> Home
                    </Link>
                </li>
                <li>
                    <Link className="flex items-center gap-2 hover:text-blue-300 p-2 rounded-lg transition-transform transform hover:scale-110" to="/recipe">
                        <FaBook className="text-xl" /> Recipe
                    </Link>
                </li>
                <li>
                    <Link className="flex items-center gap-2 hover:text-blue-300 p-2 rounded-lg transition-transform transform hover:scale-110" to="/about">
                        <FaInfoCircle className="text-xl" /> About
                    </Link>
                </li>
            </ul>

            {/* Hamburger Icon for Mobile */}
            <div className="sm:hidden flex items-center">
                <button
                    onClick={toggleMobileMenu}
                    className="text-white focus:outline-none transition-transform transform hover:scale-110"
                >
                    {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <ul className="absolute top-full left-0 w-full bg-gray-900 text-white text-lg flex flex-col items-center sm:hidden z-10 py-4">
                    <li className="w-full text-center py-2">
                        <Link className="w-full block py-2 hover:bg-gray-700" to="/" onClick={toggleMobileMenu}>
                            <FaHome className="inline text-xl mr-2" /> Home
                        </Link>
                    </li>
                    <li className="w-full text-center py-2">
                        <Link className="w-full block py-2 hover:bg-gray-700" to="/recipe" onClick={toggleMobileMenu}>
                            <FaBook className="inline text-xl mr-2" /> Recipe
                        </Link>
                    </li>
                    <li className="w-full text-center py-2">
                        <Link className="w-full block py-2 hover:bg-gray-700" to="/about" onClick={toggleMobileMenu}>
                            <FaInfoCircle className="inline text-xl mr-2" /> About
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;
