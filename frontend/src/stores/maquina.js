import { defineStore } from "pinia";
import api from "../services/api";

export const useMaquinaStore = defineStore("maquina", {
  state: () => ({
    maquinas: [],
    loading: false,
    error: null,
    successMessage: null,
  }),

  getters: {
    totalMaquinas: (state) => state.maquinas.length,
  },

  actions: {
    clearMessages() {
      this.error = null;
      this.successMessage = null;
    },

    async fetchMaquinas() {
      this.loading = true;
      this.clearMessages();
      try {
        const res = await api.get("/maquinas");
        this.maquinas = res.data;
      } catch (e) {
        this.error =
          e?.response?.data?.error || "Erro ao buscar máquinas";
        console.error("Erro ao buscar máquinas:", e);
      } finally {
        this.loading = false;
      }
    },

    async addMaquina(maquina) {
      this.loading = true;
      this.clearMessages();
      try {
        const res = await api.post("/maquinas", maquina);
        this.maquinas.unshift(res.data);
        this.successMessage = "✅ Máquina criada com sucesso!";
        return res.data;
      } catch (e) {
        this.error =
          e?.response?.data?.error || "Erro ao criar máquina";
        console.error("Erro ao criar máquina:", e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async updateMaquina(id, payload) {
      this.loading = true;
      this.clearMessages();
      try {
        const res = await api.put(`/maquinas/${id}`, payload);
        const idx = this.maquinas.findIndex((m) => m._id === id);
        if (idx !== -1) {
          this.maquinas[idx] = res.data;
          this.successMessage = "✅ Máquina atualizada com sucesso!";
        }
        return res.data;
      } catch (e) {
        this.error =
          e?.response?.data?.error || "Erro ao atualizar máquina";
        console.error("Erro ao atualizar máquina:", e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async removeMaquina(id) {
      this.loading = true;
      this.clearMessages();
      try {
        await api.delete(`/maquinas/${id}`);
        this.maquinas = this.maquinas.filter((m) => m._id !== id);
        this.successMessage = "Máquina removida com sucesso!";
      } catch (e) {
        this.error =
          e?.response?.data?.error || "Erro ao remover máquina";
        console.error("Erro ao remover máquina:", e);
        throw e;
      } finally {
        this.loading = false;
      }
    },
  },
});
