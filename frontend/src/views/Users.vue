<template>
  <div class="usuarios-container">
    <h1>👥 Gerenciamento de Usuários</h1>

    <p v-if="store.loading && !editingUser" class="carregando">⏳ Carregando usuários...</p>
    <p v-if="store.error" class="erro">❌ {{ store.error }}</p>
    <p v-if="store.successMessage" class="sucesso">{{ store.successMessage }}</p>

    <section class="form-section">
      <h2>{{ editingUser ? '✏️ Editar Usuário' : '➕ Novo Usuário' }}</h2>
      <UserForm
        :initial="editingUser"
        @submit="editingUser ? handleUpdateUser : handleAddUser"
        :submitting="store.loading"
        :edit="!!editingUser"
        @cancel="editingUser = null"
      />
    </section>

    <section class="list-section">
      <h2>📋 Lista de Usuários ({{ store.totalUsers }})</h2>
      <UserList
        :users="store.users"
        @edit="editUser"
        @remove="deleteUser"
      />
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/user";
import UserForm from "../components/UserForm.vue";
import UserList from "../components/UserList.vue";

const store = useUserStore();
const editingUser = ref(null);

onMounted(() => {
  store.fetchUsers();
  // Limpar mensagens a cada 3 segundos
  setInterval(() => {
    if (store.successMessage) store.error = null;
  }, 3000);
});

function handleAddUser(user) {
  store.addUser(user).catch(err => {
    console.error("Erro ao adicionar usuário:", err);
  });
}

function handleUpdateUser(user) {
  if (!editingUser.value) return;
  store.updateUser(editingUser.value._id, user).then(() => {
    editingUser.value = null;
  }).catch(err => {
    console.error("Erro ao atualizar usuário:", err);
  });
}

function editUser(u) {
  editingUser.value = u;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteUser(id) {
  if (confirm('Tem certeza que deseja deletar este usuário?')) {
    store.removeUser(id);
  }
}
</script>

<style scoped>
.usuarios-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  color: #fff;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.carregando, .erro, .sucesso {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 600;
}

.carregando {
  background: #e3f2fd;
  color: #1976d2;
}

.erro {
  background: rgba(255, 99, 71, 0.15);
  color: #ffb3b3;
  border-left: 4px solid #ff6347;
}

.sucesso {
  background: rgba(76, 175, 80, 0.15);
  color: #81c784;
  border-left: 4px solid #4caf50;
}

.form-section,
.list-section {
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 20px;
}

h2 {
  margin-bottom: 15px;
  font-size: 1.3rem;
}
</style>
