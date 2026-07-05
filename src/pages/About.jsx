import { Link } from "react-router-dom";
import { ChefHat, Search, BookOpen, ArrowRight, Heart, Sparkles } from "lucide-react";
import useScrollReveal from "../utils/useScrollReveal";

const features = [
  {
    icon: Search,
    title: "Smart Discovery",
    desc: "Find meals by name, category, or cuisine. Our search helps you discover exactly what you're craving.",
  },
  {
    icon: BookOpen,
    title: "Clear Instructions",
    desc: "Every recipe comes with step-by-step instructions and a complete ingredient list that you can check off.",
  },
  {
    icon: ChefHat,
    title: "World Cuisines",
    desc: "Explore dishes from every corner of the globe — Italian, Mexican, Japanese, Indian, and more.",
  },
];

function Reveal({ children, className = "" }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={`scroll-reveal ${className}`}>{children}</div>;
}

export default function About() {
  return (
    <div className="page-container">
      <div className="content-container">
        <Reveal className="max-w-3xl mx-auto text-center">
          <span className="font-accent text-brand-400/80 text-[11px] font-semibold uppercase tracking-[0.25em] mb-4 block">
            <Sparkles size={13} className="inline mr-1.5 text-brand-400/60" />
            About
          </span>
          <h1 className="section-title">Cook confidently, discover constantly.</h1>
          <p className="section-subtitle mx-auto">
            Ember helps home cooks find inspiration fast. Explore curated dishes,
            dive into detailed instructions, and discover meals that fit your taste.
          </p>
        </Reveal>

        <Reveal className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="card-accent p-6 sm:p-8 text-center group">
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-brand-500/[0.12] to-brand-500/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon size={24} className="text-brand-400" />
              </div>
              <div className="mt-4 mb-3 mx-auto w-6 h-px bg-brand-500/30" />
              <h3 className="text-xl font-display font-bold text-white">{title}</h3>
              <p className="mt-2 text-surface-500 text-sm leading-relaxed">{desc}</p>
            </article>
          ))}
        </Reveal>

        <Reveal className="mt-14 card-accent-wine p-10 sm:p-14 text-center max-w-2xl mx-auto">
          <Heart size={24} className="mx-auto text-brand-400/60 mb-3" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Ready to find your next dish?</h2>
          <p className="mt-3 text-surface-500">
            Explore thousands of recipes and turn ingredients you already have into something great.
          </p>
          <Link to="/recipes" className="btn-primary mt-6 inline-flex group">
            Explore Recipes <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
