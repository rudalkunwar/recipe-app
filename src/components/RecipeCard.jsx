import { useNavigate } from "react-router-dom";
import useScrollReveal from "../utils/useScrollReveal";

export default function RecipeCard({ meal, index = 0, wide = false }) {
  const nav = useNavigate();
  const ref = useScrollReveal();

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${Math.min(index, 3) * 50}ms` }}
      className="group card-accent cursor-pointer scroll-reveal"
      onClick={() => nav(`/recipe/${meal.idMeal}`)}
    >
      <div className={`${wide ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[4/3]"} overflow-hidden`}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 flex gap-1.5">
          {meal.strCategory && (
            <span className="badge-category text-[10px] px-2 py-0.5 uppercase tracking-wider backdrop-blur-sm">
              {meal.strCategory}
            </span>
          )}
          {meal.strArea && (
            <span className="badge-area text-[10px] px-2 py-0.5 uppercase tracking-wider backdrop-blur-sm">
              {meal.strArea}
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-display font-bold text-white leading-tight group-hover:text-brand-300 transition-colors duration-300">
          {meal.strMeal}
        </h3>
        <p className="mt-2 text-sm text-surface-500 line-clamp-2 leading-relaxed">
          {meal.strInstructions
            ?.replace(/\s+/g, " ")
            .trim()
            .slice(0, 120)
            .replace(/\s+\S*$/, "") || "No instructions available."}
        </p>

        <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center gap-1.5 text-xs text-surface-500 group-hover:text-brand-400 transition-colors duration-300">
          <span className="w-3 h-px bg-brand-500/40 group-hover:w-5 transition-all duration-300" />
          View recipe
        </div>
      </div>
    </article>
  );
}
