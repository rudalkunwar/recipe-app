import axios from "axios";

const api = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
});

export const searchMeals = (query) =>
  api.get(`/search.php?s=${encodeURIComponent(query)}`).then((r) => r.data?.meals ?? []);

export const getMealById = (id) =>
  api.get(`/lookup.php?i=${id}`).then((r) => r.data?.meals?.[0] ?? null);

export const getRandomMeal = () =>
  api.get("/random.php").then((r) => r.data?.meals?.[0] ?? null);

export const getRandomMeals = async (count = 6) => {
  const meals = [];
  const seen = new Set();
  while (meals.length < count) {
    const meal = await getRandomMeal();
    if (meal && !seen.has(meal.idMeal)) {
      seen.add(meal.idMeal);
      meals.push(meal);
    }
  }
  return meals;
};

export const getCategories = () =>
  api.get("/categories.php").then((r) => r.data?.categories ?? []);

export const getCategoryList = () =>
  api.get("/list.php?c=list").then((r) => r.data?.meals ?? []);

export const getAreaList = () =>
  api.get("/list.php?a=list").then((r) => r.data?.meals ?? []);

export const getIngredientList = () =>
  api.get("/list.php?i=list").then((r) => r.data?.meals ?? []);

export const filterByCategory = (category) =>
  api.get(`/filter.php?c=${encodeURIComponent(category)}`).then((r) => r.data?.meals ?? []);

export const filterByArea = (area) =>
  api.get(`/filter.php?a=${encodeURIComponent(area)}`).then((r) => r.data?.meals ?? []);

export const filterByIngredient = (ingredient) =>
  api.get(`/filter.php?i=${encodeURIComponent(ingredient)}`).then((r) => r.data?.meals ?? []);

export default api;
