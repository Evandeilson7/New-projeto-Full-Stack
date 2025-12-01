import axios from "axios";

const api = axios.create({
  baseURL: "https://new-projeto-full-stack.onrender.com", // seu backend
});

export default api;
