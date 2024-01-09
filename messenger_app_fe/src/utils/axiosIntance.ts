import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

api.interceptors.request.use(function (config) {
  const userString = localStorage.getItem("loginUser");
  const user = userString ? JSON.parse(userString) : null;
  config.headers.Authorization = user ? user.id : "";
  return config;
});
