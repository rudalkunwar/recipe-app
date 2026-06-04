import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";

function Description() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`/lookup.php?i=${id}`);
        if (response.data?.meals?.[0]) {
          setRecipe(response.data.meals[0]);
        } else {
          setError("Recipe not found.");
        }
      } catch (err) {
        setError("Failed to load recipe. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const ingredients = useMemo(() => {
    if (!recipe) return [];

    return Array.from({ length: 20 }, (_, index) => {
      const ingredient = recipe[`strIngredient${index + 1}`]?.trim();
      const measure = recipe[`strMeasure${index + 1}`]?.trim();

      if (!ingredient) {
        return null;
      }

      return {
        ingredient,
        measure: measure || "As needed",
      };
    }).filter(Boolean);
  }, [recipe]);

  const instructionSteps = useMemo(() => {
    if (!recipe?.strInstructions) return [];

    const compact = recipe.strInstructions.replace(/\r/g, "\n").trim();
    return compact
      .split(/\n+|(?<=\.)\s+(?=[A-Z])/)
      .map((step) => step.trim())
      .filter(Boolean);
  }, [recipe]);

  if (loading) {
    return (
      <div className="page-wrapper bg-gradient-to-b from-slate-100 to-slate-50">
        <div className="content-container">
          <div className="card-surface p-10 text-center text-slate-600">Loading recipe...</div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="page-wrapper bg-gradient-to-b from-slate-100 to-slate-50">
        <div className="content-container">
          <div className="card-surface p-10 text-center text-red-700" role="alert">
            {error || "Recipe not available."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-gradient-to-b from-slate-100 to-slate-50">
      <div className="content-container">
        <article className="card-surface overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-72 lg:h-full object-cover"
            />
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="uppercase text-xs font-semibold tracking-[0.16em] text-blue-700">
                Recipe Detail
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">{recipe.strMeal}</h1>

              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                {recipe.strCategory && (
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {recipe.strCategory}
                  </span>
                )}
                {recipe.strArea && (
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {recipe.strArea}
                  </span>
                )}
                {recipe.strTags && (
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {recipe.strTags}
                  </span>
                )}
              </div>

              <section className="mt-8">
                <h2 className="text-xl font-semibold text-slate-900">Ingredients</h2>
                <ul className="mt-4 divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                  {ingredients.length ? (
                    ingredients.map((item, index) => (
                      <li
                        key={`${item.ingredient}-${index}`}
                        className="grid grid-cols-[120px_1fr] gap-4 px-4 py-3 text-sm"
                      >
                        <span className="font-medium text-slate-700">{item.measure}</span>
                        <span className="text-slate-900">{item.ingredient}</span>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-3 text-slate-600 text-sm">
                      Ingredients are not available for this recipe.
                    </li>
                  )}
                </ul>
              </section>
            </div>
          </div>

          <section className="border-t border-slate-200 p-6 sm:p-8 lg:p-10 bg-white">
            <h2 className="text-2xl font-semibold text-slate-900">Instructions</h2>
            {instructionSteps.length ? (
              <ol className="mt-5 space-y-4">
                {instructionSteps.map((step, index) => (
                  <li key={`${index}-${step.slice(0, 20)}`} className="flex gap-3">
                    <span className="mt-0.5 w-7 h-7 flex-shrink-0 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <p className="text-slate-700 leading-7">{step}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-4 text-slate-600">Instructions are not available for this recipe.</p>
            )}
          </section>
        </article>
      </div>
    </div>
  );
}

export default Description;
