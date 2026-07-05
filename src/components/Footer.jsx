import { Link } from "react-router-dom";
import { ChefHat, Heart, ArrowUp } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/recipes", label: "Recipes" },
  { to: "/about", label: "About" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-white/[0.04] bg-surface-950">
      <div className="content-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 py-8">
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
              <ChefHat size={14} className="text-white" />
            </div>
            <span className="text-sm font-display font-bold text-white">
              Ember<span className="text-brand-400">.</span>
            </span>
          </Link>

          <div className="flex items-center gap-5">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-surface-600 hover:text-surface-300 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
            <span className="w-px h-3 bg-white/[0.06]" />
            <a
              href="https://www.themealdb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-surface-600 hover:text-surface-400 transition-colors"
            >
              TheMealDB
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-surface-600 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>

        <div className="border-t border-white/[0.03] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-surface-600">
            &copy; {new Date().getFullYear()} Ember. All rights reserved.
          </p>
          <p className="text-xs text-surface-600 flex items-center gap-1">
            Crafted with <Heart size={10} className="text-wine-500" /> for home cooks
          </p>
        </div>
      </div>
    </footer>
  );
}
