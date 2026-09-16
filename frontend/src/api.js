import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const merrProna = (params) => api.get("/properties", { params });
export const merrNjeProne = (id) => api.get(`/properties/${id}`);
export const krijoProne = (formData) => api.post("/properties", formData);
export const perditesoProne = (id, formData) => api.put(`/properties/${id}`, formData);
export const fshijProne = (id) => api.delete(`/properties/${id}`);
export const login = (data) => api.post("/auth/login", data);

export default api;
