import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaHome, FaBook, FaInfoCircle, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY.current && currentScrollY > 64) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setIsScrolled(currentScrollY > 20);
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { icon: <FaHome className="text-base" />, text: "Home", path: "/" },
    { icon: <FaBook className="text-base" />, text: "Recipes", path: "/recipe" },
    { icon: <FaInfoCircle className="text-base" />, text: "About", path: "/about" },
  ];

  const baseNavLinkClass =
    "flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur shadow-lg"
          : "bg-gradient-to-b from-slate-950/85 to-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="content-container">
        <div className="flex h-16 items-center justify-between">
          <NavLink
            to="/"
            className="text-xl sm:text-2xl font-bold text-white hover:text-blue-300 transition-colors"
          >
            Recipe App
          </NavLink>

          <div className="hidden sm:flex items-center gap-2">
            {navLinks.map(({ icon, text, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `${baseNavLinkClass} ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-slate-200 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                {icon}
                <span>{text}</span>
              </NavLink>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="sm:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </button>
        </div>

        <div
          className={`sm:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-72 pb-4" : "max-h-0"
          }`}
        >
          <div className="space-y-2 pt-2">
            {navLinks.map(({ icon, text, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `${baseNavLinkClass} ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-slate-200 hover:text-white hover:bg-white/10"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {icon}
                <span>{text}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
