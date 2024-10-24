import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1", // Base URL for the MealDB API
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
