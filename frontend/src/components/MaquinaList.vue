<template>
  <div class="maquina-list-container">
    <div v-if="!maquinas.length" class="empty-state">
      Nenhuma máquina cadastrada ainda.
    </div>

    <div v-else class="table-wrapper">
      <table class="maquina-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in maquinas" :key="m._id">
            <td>{{ m.nome }}</td>
            <td>{{ m.tipo }}</td>
            <td>
              <span :class="['badge', m.status]">
                {{ textoStatus(m.status) }}
              </span>
            </td>
            <td>
              <div class="actions">
                <button class="btn-edit" @click="$emit('edit', m)">
                  Editar
                </button>
                <button class="btn-remove" @click="confirmRemove(m)">
                  Excluir
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  maquinas: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(["edit", "remove"]);

function confirmRemove(maquina) {
  if (confirm(`Remover a máquina "${maquina.nome}"?`)) {
    emit("remove", maquina._id);
  }
}

function textoStatus(status) {
  if (status === "ativa") return "Ativa";
  if (status === "parada") return "Parada";
  if (status === "manutencao") return "Em manutenção";
  return status;
}
</script>

<style scoped>
.maquina-list-container {
  margin-top: 20px;
}

.empty-state {
  padding: 30px;
  text-align: center;
  background: #f8f9fa;
  border-radius: 12px;
  color: #7f8c8d;
}

.table-wrapper {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.maquina-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}

.maquina-table th,
.maquina-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
}

.maquina-table thead {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
}

.badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
}

.badge.ativa {
  background: #d4edda;
  color: #155724;
}

.badge.parada {
  background: #fff3cd;
  color: #856404;
}

.badge.manutencao {
  background: #f8d7da;
  color: #721c24;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-remove {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
}

.btn-edit {
  background: #e3f2fd;
  color: #1565c0;
}

.btn-remove {
  background: #ffebee;
  color: #c62828;
}
</style>
