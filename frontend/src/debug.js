// Debug - Teste de API
import api from "./services/api";

export async function testAPI() {
  console.log("🧪 Testando API...");
  
  try {
    // Teste GET /users
    console.log("📝 GET /users");
    const usersRes = await api.get("/users");
    console.log("✅ Usuários:", usersRes.data);
    
    // Teste POST /users
    console.log("📝 POST /users - Criando teste");
    const newUser = { name: "Teste", email: `teste_${Date.now()}@email.com`, role: "user" };
    const createRes = await api.post("/users", newUser);
    console.log("✅ Usuário criado:", createRes.data);
    
    // Teste GET /maquinas
    console.log("📝 GET /maquinas");
    const maquinasRes = await api.get("/maquinas");
    console.log("✅ Máquinas:", maquinasRes.data);
    
  } catch (error) {
    console.error("❌ Erro:", error.response?.data || error.message);
  }
}

// Expor no window para usar no console
window.testAPI = testAPI;
console.log("🔧 Use window.testAPI() no console para testar a API");
