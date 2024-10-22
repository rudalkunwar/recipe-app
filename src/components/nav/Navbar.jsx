import React, { useState, useEffect } from 'react';
import { FaHome, FaBook, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar() {
    const [visible, setVisible] = useState(true);
    let lastScrollY = 0;

    const handleScroll = () => {
        if (typeof window !== 'undefined') {
            const currentScrollY = window.scrollY;

            // Compare current scroll position with the last position
            if (currentScrollY > lastScrollY) {
                // Scrolling down
                setVisible(false);
            } else {
                // Scrolling up
                setVisible(true);
            }
            lastScrollY = currentScrollY;
        }
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
                <Link className='flex items-center gap-2 p-2 rounded-lg transition-transform transform hover:scale-110' to=''> Recipe App</Link>
            </div>
            {/* Menu Section */}
            <ul className="hidden gap-8 text-white text-lg sm:flex">
                <li>
                    <Link className='flex items-center gap-2 hover:text-blue-300 p-2 rounded-lg transition-transform transform hover:scale-110' to=''>  <FaHome className="text-xl" /> Home</Link>
                </li>
                <li>
                    <Link className='flex items-center gap-2 hover:text-blue-300 p-2 rounded-lg transition-transform transform hover:scale-110' to=''>  <FaBook className="text-xl" /> Recipe</Link>
                </li>
                <li>
                    <Link className='flex items-center gap-2 hover:text-blue-300 p-2 rounded-lg transition-transform transform hover:scale-110' to=''>  <FaInfoCircle className="text-xl" /> About</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
