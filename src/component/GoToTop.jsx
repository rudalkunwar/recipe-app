import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed z-50 bottom-8 right-8">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="relative bg-blue-600 text-white font-bold rounded-full focus:outline-none shadow-md transition-all duration-300 ease-in-out transform hover:scale-110"
          style={{ padding: "12px" }} // Adjust padding for a complete circle
        >
          <FaArrowUp size={24} className="relative z-10" />
        </button>
      )}
    </div>
  );
};

export default GoToTop;