import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Recipe = () => {
    const [mealName, setMealName] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const nav = useNavigate();

    const fetchRecipes = async () => {
        if (!mealName.trim()) {
            setError('Please enter a meal name');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`/search.php?s=${mealName}`);
            if (response.data.meals) {
                setRecipes(response.data.meals);
            } else {
                setError('No meals found. Please try a different name.');
            }
        } catch (err) {
            setError('Failed to fetch recipes. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchRecipes();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="max-w-2xl mx-auto mb-8 text-center">
                    <div className="flex gap-3 mb-6 pt-4">
                        <input
                            type="text"
                            value={mealName}
                            onChange={(e) => setMealName(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter meal name (e.g., Pasta, Chicken)"
                            className="flex-1 h-14 px-5 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            onClick={fetchRecipes}
                            disabled={loading}
                            className="h-14 px-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                'Search'
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                            {error}
                        </div>
                    )}
                </div>

                {recipes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recipes.map((meal) => (
                            <div
                                key={meal.idMeal}
                                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="relative">
                                    <img
                                        src={meal.strMealThumb}
                                        alt={meal.strMeal}
                                        className="w-full h-52 object-cover"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                                        {meal.strMeal}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-3 mb-4">
                                        {meal.strInstructions}
                                    </p>
                                    <button onClick={() => nav(`/recipe/des/${meal.idMeal}`)} className="w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                                        View Recipe
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {loading && (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {!loading && !error && recipes.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        Search for a recipe to get started
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recipe;
