<template>
  <div class="usuarios-container">
    <h1>👥 Gerenciamento de Usuários</h1>

    <p v-if="store.loading">Carregando usuários...</p>
    <p v-if="store.error" class="erro">Erro: {{ store.error }}</p>

    <section class="form-section">
      <h2>Novo Usuário</h2>
      <UserForm
        @submit="store.addUser"
        :submitting="store.loading"
      />
    </section>

    <section class="list-section">
      <h2>Lista de Usuários ({{ store.totalUsers }})</h2>
      <UserList
        :users="store.users"
        @edit="edit"
        @remove="store.removeUser"
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
const editing = ref(null);

// busca usuário ao montar
onMounted(() => {
  store.fetchUsers();
});

function edit(u) {
  // por enquanto só loga
  console.log("Editar usuário:", u);
}
</script>

<style scoped>
.usuarios-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  color: #fff;
}
.erro {
  color: #ffb3b3;
  font-weight: bold;
}
.form-section,
.list-section {
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 20px;
}
</style>
