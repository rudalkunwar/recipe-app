import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Globe, ChefHat, Tag, Check, Loader2, Youtube, ExternalLink, Salad, Share2 } from "lucide-react";
import { getMealById } from "../utils/api";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState({});

  useEffect(() => {
    setLoading(true);
    getMealById(id)
      .then(setRecipe)
      .catch(() => setRecipe(null))
      .finally(() => setLoading(false));
  }, [id]);

  const ingredients = useMemo(() => {
    if (!recipe) return [];
    return Array.from({ length: 20 }, (_, i) => {
      const ingredient = recipe[`strIngredient${i + 1}`]?.trim();
      const measure = recipe[`strMeasure${i + 1}`]?.trim();
      return ingredient ? { ingredient, measure: measure || "to taste" } : null;
    }).filter(Boolean);
  }, [recipe]);

  const steps = useMemo(() => {
    if (!recipe?.strInstructions) return [];
    return recipe.strInstructions
      .replace(/\r/g, "\n")
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s && !/^\d+$/.test(s))
      .map((s) => s.replace(/^STEP\s+\w+[\s\-:.]*/i, "").replace(/^\d+[\s.).\-:]+/, ""))
      .filter(Boolean);
  }, [recipe]);

  const toggleIngredient = (key) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const shareRecipe = () => {
    if (navigator.share) {
      navigator.share({ title: recipe.strMeal, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-brand-400 mx-auto" />
          <p className="mt-4 text-surface-500 text-sm">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="page-container">
        <div className="content-container">
          <div className="card-accent-wine p-12 text-center max-w-md mx-auto">
            <Salad size={38} className="mx-auto text-surface-600 mb-4" />
            <p className="text-surface-400 text-lg">Recipe not found.</p>
            <Link to="/recipes" className="btn-primary mt-6 inline-flex">
              Back to Recipes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container pb-0">
      {/* ─── HERO ─── */}
      <div className="relative h-[50vh] sm:h-[55vh] overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/50 to-transparent" />
        <div className="absolute inset-0 bg-dots opacity-30" />

        <div className="absolute bottom-0 left-0 right-0 content-container pb-10 sm:pb-14">
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2 text-sm text-surface-600 hover:text-surface-300 transition-all duration-200 mb-4 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to recipes
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white max-w-3xl leading-tight">
            {recipe.strMeal}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {recipe.strCategory && (
              <span className="badge-category text-sm px-3.5 py-1.5">
                <ChefHat size={13} />
                {recipe.strCategory}
              </span>
            )}
            {recipe.strArea && (
              <span className="badge-area text-sm px-3.5 py-1.5">
                <Globe size={13} />
                {recipe.strArea}
              </span>
            )}
            {recipe.strTags?.split(",").map((tag) => tag.trim()).filter(Boolean).map((tag) => (
              <span key={tag} className="badge-tag text-sm px-3.5 py-1.5">
                <Tag size={13} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="content-container -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── INSTRUCTIONS ─── */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-accent p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center">
                  <ChefHat size={18} className="text-brand-400" />
                </span>
                Instructions
              </h2>
              <div className="mt-6 space-y-5">
                {steps.length ? steps.map((step, i) => (
                  <div key={i} className="flex gap-4 group">
                    <span className="mt-0.5 w-7 h-7 flex-shrink-0 rounded-lg bg-white/[0.04] text-surface-500 text-xs font-bold flex items-center justify-center group-hover:bg-brand-500/[0.12] group-hover:text-brand-300 transition-all duration-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-surface-400 leading-relaxed pt-1 group-hover:text-surface-300 transition-colors duration-300">{step}</p>
                  </div>
                )) : (
                  <p className="text-surface-600">Instructions are not available for this recipe.</p>
                )}
              </div>
            </div>
          </div>

          {/* ─── SIDEBAR ─── */}
          <div className="space-y-6">
            <div className="card-accent p-6 sm:p-8">
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-3 mb-5">
                <span className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center">
                  <Check size={15} className="text-brand-400" />
                </span>
                Ingredients
                <span className="text-xs font-normal text-surface-600 ml-auto">{ingredients.length}</span>
              </h2>
              <ul className="space-y-1">
                {ingredients.map((item, i) => {
                  const key = `${item.ingredient}-${i}`;
                  return (
                    <li key={key}>
                      <button
                        onClick={() => toggleIngredient(key)}
                        className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          checked[key]
                            ? "text-surface-600"
                            : "text-surface-400 hover:bg-white/[0.03]"
                        }`}
                      >
                        <span className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                          checked[key]
                            ? "bg-brand-600 border-brand-600"
                            : "border-white/[0.12]"
                        }`}>
                          {checked[key] && <Check size={10} className="text-white" />}
                        </span>
                        <span className="text-surface-600 text-xs font-medium min-w-[65px]">{item.measure}</span>
                        <span className={checked[key] ? "line-through" : ""}>{item.ingredient}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full group"
              >
                <Youtube size={18} />
                Watch on YouTube
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}

            {recipe.strSource && (
              <a
                href={recipe.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full group"
              >
                <ExternalLink size={16} />
                View Original Source
              </a>
            )}

            <button onClick={shareRecipe} className="btn-ghost w-full">
              <Share2 size={16} />
              Share Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
