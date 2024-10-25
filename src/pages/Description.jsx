import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axiosInstance';

function Description() {
    const { id } = useParams(); // Get recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`/lookup.php?i=${id}`);
                if (response.data.meals) {
                    setRecipe(response.data.meals[0]);
                } else {
                    setError('Recipe not found.');
                }
            } catch (err) {
                setError('Failed to load recipe. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 pt-20 pb-10">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.strMeal}</h1>
                    <p className="text-gray-600 mb-6">{recipe.strInstructions}</p>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ingredients</h2>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                        {[...Array(20)].map((_, i) => {
                            const ingredient = recipe[`strIngredient${i + 1}`];
                            const measure = recipe[`strMeasure${i + 1}`];
                            return (
                                ingredient && (
                                    <li key={i}>
                                        {measure} {ingredient}
                                    </li>
                                )
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Description;
