<template>
  <form @submit.prevent="onSubmit" class="user-form">
    <div class="form-group">
      <label for="name">Nome Completo</label>
      <input 
        id="name"
        v-model="state.name" 
        type="text"
        placeholder="Digite o nome completo" 
        required 
      />
    </div>

    <div class="form-group">
      <label for="email">E-mail</label>
      <input 
        id="email"
        v-model="state.email" 
        type="email"
        placeholder="exemplo@email.com" 
        required 
      />
    </div>

    <div class="form-group">
      <label for="role">Função</label>
      <select id="role" v-model="state.role">
        <option value="user">👤 Usuário</option>
        <option value="admin">👑 Administrador</option>
      </select>
    </div>

    <div class="form-actions">
      <button type="submit" :disabled="submitting" class="btn-primary">
        {{ submitting ? 'Salvando...' : (edit ? '✓ Salvar Alterações' : '+ Adicionar Usuário') }}
      </button>
      <button 
        v-if="edit" 
        type="button" 
        @click="handleCancel" 
        class="btn-secondary"
      >
        ✕ Cancelar
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  initial: { 
    type: Object, 
    default: null 
  },
  submitting: { 
    type: Boolean, 
    default: false 
  },
  edit: { 
    type: Boolean, 
    default: false 
  }
});

const emit = defineEmits(["submit", "cancel"]);

const state = reactive({
  name: "",
  email: "",
  role: "user"
});

watch(
  () => props.initial,
  (val) => {
    if (val) {
      state.name = val.name || "";
      state.email = val.email || "";
      state.role = val.role || "user";
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

function onSubmit() {
  const formData = { 
    name: state.name.trim(), 
    email: state.email.trim(), 
    role: state.role 
  };
  
  emit("submit", formData);

  // Só reseta o form se não estiver em modo edição
  if (!props.edit) {
    setTimeout(() => {
      resetForm();
    }, 100);
  }
}

function handleCancel() {
  resetForm();
  emit("cancel");
}

function resetForm() {
  state.name = "";
  state.email = "";
  state.role = "user";
}
</script>

<style scoped>
.user-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 600;
  color: #ffffff;
  font-size: 0.95rem;
}

.form-group input,
.form-group select {
  padding: 10px 12px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  font-size: 1rem;
  background: #ffffff;
  color: #2c3e50;
  transition: all 0.2s ease;
}

.form-group input::placeholder {
  color: #95a5a6;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #667eea;
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.btn-primary,
.btn-secondary {
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  flex: 1;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.btn-primary:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.btn-secondary {
  background: #e0e0e0;
  color: #555;
}

.btn-secondary:hover {
  background: #d0d0d0;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style>
