Vue
Copy
<template>
  <div class="user-list-container">
    <div v-if="users.length === 0" class="empty-state">
      <p>📭 Nenhum usuário cadastrado ainda.</p>
    </div>

    <div v-else class="table-wrapper">
      <table class="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u._id">
            <td>
              <div class="user-name">
                <span class="user-icon">👤</span>
                {{ u.name }}
              </div>
            </td>
            <td>
              <span class="user-email">{{ u.email }}</span>
            </td>
            <td>
              <span :class="['badge', u.role]">
                {{ u.role === 'admin' ? '👑 Admin' : '👤 Usuário' }}
              </span>
            </td>
            <td>
              <div class="actions">
                <button 
                  @click="$emit('edit', u)" 
                  class="btn-edit"
                  title="Editar usuário"
                >
                  ✏️ Editar
                </button>
                <button 
                  @click="confirmRemove(u)" 
                  class="btn-remove"
                  title="Excluir usuário"
                >
                  🗑️ Excluir
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

const props = defineProps({ 
  users: { 
    type: Array, 
    default: () => [] 
  }
});

const emit = defineEmits(["edit", "remove"]);

function confirmRemove(user) {
  if (confirm(`Tem certeza que deseja excluir o usuário "${user.name}"?`)) {
    emit('remove', user._id);
  }
}
</script>

<style scoped>
.user-list-container {
  margin-top: 20px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #f8f9fa;
  border-radius: 12px;
  color: #7f8c8d;
  font-size: 1.1rem;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.user-table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.user-table th {
  padding: 16px;
  text-align: left;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.user-table tbody tr {
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
}

.user-table tbody tr:hover {
  background-color: #f8f9fa;
}

.user-table tbody tr:last-child {
  border-bottom: none;
}

.user-table td {
  padding: 16px;
}

.user-name {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: #2c3e50;
}

.user-icon {
  font-size: 1.2rem;
}

.user-email {
  color: #7f8c8d;
  font-size: 0.95rem;
}

.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.badge.admin {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.badge.user {
  background: #e3f2fd;
  color: #1976d2;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-remove {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;
}

.btn-edit {
  background: #e3f2fd;
  color: #1976d2;
}

.btn-edit:hover {
  background: #bbdefb;
  transform: translateY(-2px);
}

.btn-remove {
  background: #ffebee;
  color: #c62828;
}

.btn-remove:hover {
  background: #ffcdd2;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .user-table {
    font-size: 0.9rem;
  }

  .user-table th,
  .user-table td {
    padding: 12px 8px;
  }

  .actions {
    flex-direction: column;
    gap: 6px;
  }

  .btn-edit,
  .btn-remove {
    width: 100%;
    font-size: 0.85rem;
  }

  .user-name {
    font-size: 0.9rem;
  }

  .user-email {
    font-size: 0.85rem;
  }
}
</style>
