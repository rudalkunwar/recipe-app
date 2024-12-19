import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://node-js-server.netlify.app/api/messages", // Base URL for the MealDB API
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
