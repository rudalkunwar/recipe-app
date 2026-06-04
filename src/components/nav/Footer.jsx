import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 py-10 mt-auto">
      <div className="content-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm">© 2026 RecipeApp. Crafted for home cooks.</p>
          <div className="flex items-center gap-5 text-sm">
            <Link to="/recipe" className="hover:text-white transition-colors">
              Browse Recipes
            </Link>
            <Link to="/submitRecipe" className="hover:text-white transition-colors">
              Submit Recipe
            </Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
