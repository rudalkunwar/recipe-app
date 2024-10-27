import React from "react";
import GoToTop from "../../component/GoToTop";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm">
            © 2024 RecipeApp. All rights reserved.
          </p>
        </div>
      </footer>
      <GoToTop />
    </>
  );
};

export default Footer;
