Vue
Copiar
<template>
  <div class="usuarios-container">
    <div class="header">
      <h1>👥 Gerenciamento de Usuários</h1>
      <span class="badge">{{ store.totalUsers }} usuários</span>
    </div>

    <!-- Formulário de Adicionar/Editar -->
    <div class="form-section">
      <h2>{{ editing ? '✏️ Editar Usuário' : '➕ Adicionar Novo Usuário' }}</h2>
      <UserForm
        v-if="!editing"
        @submit="store.addUser"
        :submitting="store.loading"
      />
      <UserForm
        v-else
        :initial="editing"
        :submitting="store.loading"
        @submit="handleUpdate"
        @cancel="cancelEdit"
        edit
      />
    </div>

    <!-- Mensagem de Erro -->
    <div v-if="store.error" class="error-message">
      ❌ {{ store.error }}
    </div>

    <!-- Loading -->
    <div v-if="store.loading && !store.users.length" class="loading">
      <p>Carregando usuários...</p>
    </div>

    <!-- Lista de Usuários -->
    <div v-else class="list-section">
      <h2>📋 Lista de Usuários</h2>
      <UserList 
        :users="store.users" 
        @edit="edit" 
        @remove="store.removeUser" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import UserForm from "../components/UserForm.vue";
import UserList from "../components/UserList.vue";

const store = useUserStore();
const editing = ref(null);

onMounted(() => {
  store.fetchUsers();
});

function edit(user) {
  editing.value = { ...user };
}

function handleUpdate(payload) {
  store.updateUser(editing.value._id, payload);
  editing.value = null;
}

function cancelEdit() {
  editing.value = null;
}
</script>

<style scoped>
.usuarios-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
}

.header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
}

.badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.form-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-section h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.error-message {
  background: #fee;
  color: #c00;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid #c00;
  font-weight: 500;
}

.loading {
  text-align: center;
  padding: 60px 20px;
  font-size: 1.2rem;
  color: #7f8c8d;
}

.list-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.list-section h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
}
</style>
