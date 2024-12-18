import { useState, useEffect } from "react";
import React from "react";
import Footer from "../components/nav/Footer";

// --------------------FORM COMPONENT-------------------------
const RecipeFormCompnent = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleImageChange = (e) => {
    setRecipe({ ...recipe, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., sending data to the backend
    console.log("Submitted recipe:", recipe);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mb-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 font-serif">
        Submit Your Recipe
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter recipe title / Food name "
            required
          />
        </div>

        <div className="mb-10 my-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                name="category"
                value="veg"
                checked={recipe.category === "veg"}
                onChange={handleChange}
                className="mr-2"
              />
              Veg
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="non-veg"
                checked={recipe.category === "non-veg"}
                onChange={handleChange}
                className="mr-2"
              />
              Non-Veg
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a brief description"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Ingredients
          </label>
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="List ingredients, separated by commas"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Steps
          </label>
          <textarea
            name="steps"
            value={recipe.steps}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Describe each step"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

// ------------------------RECIPE PAGE-----------------------------------
const RecipeForm = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on load
  }, []);

  return (
    <>
      {/* ---------HEADER------------- */}
      <div className="relative pt-8 sm:pt-12 md:pt-16">
        <img
          src="/images/formImage4.jpeg"
          alt="Food Background"
          className="w-full h-48 sm:h-64 md:h-72 lg:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-55 flex justify-center items-center">
          <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center px-4">
            SUBMIT YOUR RECIPE
          </h1>
        </div>
      </div>

      <div className="px-4 sm:px-10 md:px-20 lg:px-32 xl:px-56 pt-10 md:pt-16 lg:pt-24">
        <p className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-center">
          Got a delicious recipe in hand?
        </p>
        <p className="text-base sm:text-lg md:text-xl mt-4 md:mt-5 text-center">
          Share it here and let others try it. You’ll get ratings based on
          community feedback of your recipe.
        </p>
      </div>

      {/*---------- FORM SECTION-----------  */}
      <div className="mr-10 pt-16">
        <RecipeFormCompnent />
      </div>
    </>
  );
};

export default RecipeForm;
