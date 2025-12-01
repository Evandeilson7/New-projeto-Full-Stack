import axios from "axios";

// Usa variável de ambiente ou localhost para desenvolvimento
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: baseURL,
});

export default api;
