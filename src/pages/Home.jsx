import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Globe, ChefHat, Search,
  BookOpen, Star, Quote, ChevronDown, Salad, Flame,
} from "lucide-react";
import { getRandomMeal, getCategories } from "../utils/api";
import RecipeCard from "../components/RecipeCard";
import useScrollReveal from "../utils/useScrollReveal";

const stats = [
  { value: "10k+", label: "Recipes" },
  { value: "60+", label: "Cuisines" },
  { value: "All", label: "Free to use" },
];

const steps = [
  { icon: Search, title: "Search", desc: "Find any dish by name, ingredient, or cuisine." },
  { icon: BookOpen, title: "Explore", desc: "Browse detailed instructions and ingredients." },
  { icon: ChefHat, title: "Cook", desc: "Follow step-by-step and enjoy your creation." },
];

function SectionHeader({ label, title, desc }) {
  return (
    <div className="text-center">
      <span className="font-accent text-brand-400/80 text-[11px] font-semibold uppercase tracking-[0.25em] mb-4 block">
        {label}
      </span>
      <h2 className="section-title">{title}</h2>
      {desc && <p className="section-subtitle mx-auto">{desc}</p>}
    </div>
  );
}

function Reveal({ children, className = "" }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={`scroll-reveal ${className}`}>{children}</div>;
}

function Divider() {
  return (
    <div className="divider">
      <span className="divider-leaf">✦</span>
    </div>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState(null);
  const [categories, setCategories] = useState([]);
  const [randomMeals, setRandomMeals] = useState([]);
  const heroRef = useScrollReveal();

  useEffect(() => {
    getRandomMeal().then(setFeatured);
    getCategories().then(setCategories);
    const fetchRandoms = async () => {
      const meals = [];
      const seen = new Set();
      while (meals.length < 6) {
        const m = await getRandomMeal();
        if (m && !seen.has(m.idMeal)) { seen.add(m.idMeal); meals.push(m); }
      }
      setRandomMeals(meals);
    };
    fetchRandoms();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featured?.strMealThumb || "/images/bg-home.jpeg"}
            alt=""
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-surface-950/65" />
          <div className="absolute inset-0 bg-gradient-to-br from-surface-950/95 via-surface-950/70 to-transparent" />
          <div className="absolute inset-0 bg-dots" />
        </div>

        <div className="absolute top-1/4 right-[10%] w-72 h-72 rounded-full bg-brand-500/8 blur-[120px] animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 left-[5%] w-56 h-56 rounded-full bg-vine-500/8 blur-[100px] animate-float-delayed pointer-events-none" />

        <div className="content-container relative z-10 w-full py-28">
          <div ref={heroRef} className="max-w-3xl scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-500/15 bg-brand-500/8 text-brand-300/90 text-[11px] font-medium uppercase tracking-[0.15em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500/60" />
              Daily Recipe Inspiration
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[0.95] tracking-tight">
              <span className="gradient-text-hero">
                Cook<br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>something
              </span>
              <br />
              <span className="text-white/80 font-normal italic">
                unforgettable
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-surface-500 max-w-xl leading-relaxed">
              Explore thousands of recipes from every cuisine. Search by dish,
              discover new flavors, and cook with confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/recipes" className="btn-primary text-base px-8 py-3.5 group">
                Start Exploring
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link to="/about" className="btn-secondary text-base px-8 py-3.5">
                Learn More
              </Link>
            </div>

            {featured && (
              <div className="mt-14 max-w-sm animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <p className="text-[10px] uppercase tracking-[0.25em] text-surface-600 mb-3 font-semibold">
                  <span className="inline-block w-1 h-1 rounded-full bg-brand-500/60 mr-2 align-middle" />
                  Today's Pick
                </p>
                <Link
                  to={`/recipe/${featured.idMeal}`}
                  className="group flex items-center gap-4 p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.05] hover:border-brand-500/20 transition-all duration-300"
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-white/[0.06] group-hover:ring-brand-500/30 transition-all">
                    <img src={featured.strMealThumb} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors truncate">
                      {featured.strMeal}
                    </p>
                    <p className="text-xs text-surface-600 mt-0.5">
                      {featured.strArea} &middot; {featured.strCategory}
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-surface-600 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up" style={{ animationDelay: "1s" }}>
          <span className="text-[9px] uppercase tracking-[0.25em] text-surface-600 font-semibold">Scroll</span>
          <ChevronDown size={14} className="text-surface-600 animate-bounce" />
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-14 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500/[0.015] to-transparent pointer-events-none" />
        <Divider />
        <div className="content-container">
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-display font-bold gradient-text">{s.value}</p>
                <p className="mt-1 text-sm text-surface-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <Divider />
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <Reveal className="py-16">
        <div className="content-container">
          <SectionHeader
            label="How It Works"
            title="Three simple steps"
            desc="Finding and cooking great recipes has never been easier."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="card-accent p-8 text-center group scroll-reveal" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-brand-500/[0.12] to-brand-500/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} className="text-brand-400" />
                </div>
                <div className="mt-4 mb-3 mx-auto w-6 h-px bg-brand-500/30" />
                <h3 className="text-xl font-display font-bold text-white">{title}</h3>
                <p className="mt-2 text-surface-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ─── CATEGORIES ─── */}
      <Reveal className="py-16 relative">
        <div className="absolute inset-0 bg-white/[0.015] pointer-events-none" />
        <div className="content-container">
          <SectionHeader
            label="Browse by Category"
            title="Explore cuisines"
            desc="Pick a category and discover dishes from every corner of the world."
          />

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.slice(0, 12).map((cat, i) => (
              <Link
                key={cat.idCategory}
                to={`/recipes?category=${encodeURIComponent(cat.strCategory)}`}
                className="card-accent p-5 text-center group scroll-reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-brand-500/10 blur-sm group-hover:blur-md transition-all" />
                  <img
                    src={cat.strCategoryThumb}
                    alt={cat.strCategory}
                    className="relative w-full h-full object-cover rounded-full ring-1 ring-white/[0.06] group-hover:ring-brand-500/30 transition-all group-hover:scale-110 duration-300"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-surface-400 group-hover:text-brand-300 transition-colors">
                  {cat.strCategory}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ─── RANDOM PICKS ─── */}
      <Reveal className="py-16">
        <div className="content-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="font-accent text-brand-400/80 text-[11px] font-semibold uppercase tracking-[0.25em] mb-3 block">
                <span className="inline-flex items-center gap-2">
                  <Salad size={13} className="text-brand-400/60" />
                  Discover
                </span>
              </span>
              <h2 className="section-title">Random picks for you</h2>
            </div>
            <Link to="/recipes" className="hidden sm:inline-flex btn-ghost text-sm gap-1.5">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {randomMeals.map((meal, i) => (
              <RecipeCard key={meal.idMeal} meal={meal} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/recipes" className="btn-secondary">
              View All Recipes <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* ─── QUOTE ─── */}
      <Reveal className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.015] to-transparent pointer-events-none" />
        <div className="content-container">
          <div className="card-accent-wine p-10 sm:p-14 text-center max-w-4xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-vine-500/5 pointer-events-none" />

            <Quote size={24} className="mx-auto text-brand-500/20 mb-4" />
            <blockquote className="text-xl sm:text-2xl font-display font-medium text-surface-300 italic leading-relaxed max-w-2xl mx-auto">
              "Cooking is at its most spectacular when every ingredient tells its own story."
            </blockquote>
            <div className="mt-5 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-brand-500/40 fill-brand-500/40" />
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ─── CTA ─── */}
      <Reveal className="py-16 pb-24">
        <div className="content-container">
          <div className="relative rounded-2xl overflow-hidden card-accent">
            <div className="absolute inset-0">
              <img
                src={randomMeals[0]?.strMealThumb || "/images/bg-home.jpeg"}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-surface-950/85" />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/8 via-surface-950/60 to-vine-500/8" />
              <div className="absolute inset-0 bg-dots" />
            </div>

            <div className="relative z-10 p-10 sm:p-16 lg:p-20 text-center">
              <Flame size={32} className="mx-auto text-brand-400/60 mb-4" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
                Ready to cook
                <br />
                <span className="gradient-text">something amazing</span>?
              </h2>
              <p className="mt-4 text-surface-500 max-w-lg mx-auto text-lg leading-relaxed">
                Dive into thousands of recipes. Find your next favorite dish tonight.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/recipes" className="btn-primary text-base px-10 py-3.5 group">
                  <Globe size={18} />
                  Start Exploring
                  <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
