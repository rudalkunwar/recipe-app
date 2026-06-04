import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Recipe = () => {
  const [mealName, setMealName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nav = useNavigate();

  const hasResults = recipes.length > 0;

  const emptyStateMessage = useMemo(() => {
    if (loading) return "Searching recipes...";
    if (error) return error;
    if (mealName.trim() && !hasResults) {
      return "No recipes matched your search. Try a different meal name.";
    }
    return "Search by dish name to discover recipes.";
  }, [error, hasResults, loading, mealName]);

  const fetchRecipes = useCallback(async (searchTerm) => {
    const query = searchTerm.trim();

    if (!query) {
      setRecipes([]);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`/search.php?s=${encodeURIComponent(query)}`);
      setRecipes(response.data?.meals ?? []);

      if (!response.data?.meals) {
        setError("No meals found. Try another name.");
      }
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
      setRecipes([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchRecipes(mealName);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRecipes(mealName);
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchRecipes, mealName]);

  const getRecipeExcerpt = (instructions = "") => {
    const normalized = instructions.replace(/\s+/g, " ").trim();
    if (!normalized) return "Instructions are not available for this recipe yet.";
    if (normalized.length <= 150) return normalized;
    return `${normalized.slice(0, 147)}...`;
  };

  return (
    <div className="page-wrapper bg-gradient-to-b from-slate-100 to-slate-50">
      <div className="content-container">
        <div className="max-w-3xl mx-auto text-center card-surface p-6 sm:p-8">
          <p className="uppercase text-xs font-semibold tracking-[0.16em] text-blue-700">
            Recipe Search
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            Find your next favorite meal
          </h1>
          <p className="mt-3 text-slate-600">
            Search recipes by meal name and open full cooking instructions instantly.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 text-left">
            <label htmlFor="meal-search" className="sr-only">
              Search meal name
            </label>
            <input
              id="meal-search"
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Try 'Pasta', 'Chicken', or 'Soup'"
              className="flex-1 h-12 px-4 rounded-xl border border-slate-300 bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => fetchRecipes(mealName)}
              disabled={loading}
              className="btn-primary h-12"
            >
              {loading ? "Searching..." : "Search Recipes"}
            </button>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm"
            >
              {error}
            </p>
          )}
        </div>

        {!hasResults && (
          <div className="max-w-3xl mx-auto mt-8 card-surface p-6 text-center text-slate-600">
            {loading ? (
              <div className="flex justify-center items-center gap-3 text-blue-700">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span>{emptyStateMessage}</span>
              </div>
            ) : (
              <p>{emptyStateMessage}</p>
            )}
          </div>
        )}

        {hasResults && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-5">
              {recipes.length} recipe{recipes.length === 1 ? "" : "s"} found
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {recipes.map((meal) => (
                <article
                  key={meal.idMeal}
                  className="card-surface overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-52 object-cover"
                    loading="lazy"
                  />
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-slate-900">{meal.strMeal}</h3>
                    <p className="mt-3 text-sm text-slate-600 leading-6 flex-1">
                      {getRecipeExcerpt(meal.strInstructions)}
                    </p>
                    <button
                      type="button"
                      onClick={() => nav(`/recipe/des/${meal.idMeal}`)}
                      className="mt-5 btn-secondary w-full"
                    >
                      View Recipe
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Recipe;
