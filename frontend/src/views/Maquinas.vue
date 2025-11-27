<template>
  <div class="maquinas-container">
    <div class="header">
      <h1>🏭 Gerenciamento de Máquinas</h1>
      <span class="badge">{{ store.totalMaquinas }} máquinas</span>
    </div>

    <div class="form-section">
      <h2>➕ Nova Máquina</h2>
      <MaquinaForm
        @submit="store.addMaquina"
        :submitting="store.loading"
      />
    </div>

    <div v-if="store.error" class="error-message">
      ❌ {{ store.error }}
    </div>

    <div v-if="store.loading && !store.maquinas.length" class="loading">
      <p>Carregando máquinas...</p>
    </div>

    <div v-else class="list-section">
      <h2>📋 Lista de Máquinas</h2>
      <MaquinaList 
        :maquinas="store.maquinas" 
        @edit="edit" 
        @remove="store.removeMaquina" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMaquinaStore } from "../stores/maquina";
import MaquinaForm from "../components/MaquinaForm.vue";
import MaquinaList from "../components/MaquinaList.vue";

const store = useMaquinaStore();
const editing = ref(null);

onMounted(() => {
  store.fetchMaquinas();
});

function edit(maquina) {
  // por enquanto só loga, depois fazemos edição real
  console.log("Editar máquina:", maquina);
  editing.value = { ...maquina };
}
</script>

<style scoped>
.maquinas-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2rem;
}

.badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.9rem;
}

.form-section,
.list-section {
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 20px;
}

.error-message {
  margin-top: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  background: rgba(255, 99, 71, 0.15);
  border: 1px solid rgba(255, 99, 71, 0.4);
}

.loading {
  margin-top: 16px;
}
</style>
