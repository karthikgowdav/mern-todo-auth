import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://mern-backenddd.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/** Human-readable message for failed API calls (network, 4xx/5xx, etc.). */
export function getApiErrorMessage(err, fallback) {
  if (err.response?.data) {
    const d = err.response.data;
    if (typeof d === "string") return d;
    if (d.message) return d.message;
  }
  if (err.code === "ERR_NETWORK" || err.message === "Network Error") {
    return "Cannot reach the server. Start the backend from the project: cd backend, then npm run dev. Also make sure MongoDB is running (local or Atlas).";
  }
  return fallback;
}

export default API;
