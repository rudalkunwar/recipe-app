import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.spoonacular.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const apiKey = `${process.env.REACT_APP_API_KEY}`; // don't forget to add the your actual api key in the .env file
    config.params = {
      ...config.params,
      apiKey: apiKey,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
