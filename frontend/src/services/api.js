import axios from "axios";

// Obter URL da API das variáveis de ambiente
const baseURL = import.meta.env.VITE_API_URL || "https://meu-backend.onrender.com";
const timeout = parseInt(import.meta.env.VITE_API_TIMEOUT || "10000");

const api = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => {
    console.log("✅ Requisição bem-sucedida:", response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("❌ Erro na resposta:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("❌ Erro na requisição:", error.message);
    } else {
      console.error("❌ Erro geral:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
