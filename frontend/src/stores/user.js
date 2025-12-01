import { defineStore } from "pinia";
import api from "../services/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),

  getters: {
    totalUsers: (state) => state.users.length,
  },

  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.get("/users");
        this.users = res.data;
        console.log("✅ Usuários carregados:", this.users);
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao buscar usuários";
        console.error("❌ Erro ao buscar usuários:", e);
      } finally {
        this.loading = false;
      }
    },

    async addUser(user) {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.post("/users", user);
        this.users.unshift(res.data);
        console.log("✅ Usuário criado com sucesso:", res.data);
        return res.data;
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao criar usuário";
        console.error("❌ Erro ao criar usuário:", e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async removeUser(id) {
      this.loading = true;
      this.error = null;
      try {
        await api.delete(`/users/${id}`);
        this.users = this.users.filter((u) => u._id !== id);
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao remover usuário";
      } finally {
        this.loading = false;
      }
    },
  },
});
