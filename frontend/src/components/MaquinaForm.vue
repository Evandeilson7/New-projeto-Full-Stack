<template>
  <form @submit.prevent="onSubmit" class="maquina-form">
    <div class="form-group">
      <label for="nome">Nome da Máquina</label>
      <input
        id="nome"
        v-model="state.nome"
        type="text"
        placeholder="Ex: Prensa Hidráulica"
        required
      />
    </div>

    <div class="form-group">
      <label for="tipo">Tipo</label>
      <input
        id="tipo"
        v-model="state.tipo"
        type="text"
        placeholder="Ex: Industrial, CNC, etc."
        required
      />
    </div>

    <div class="form-group">
      <label for="status">Status</label>
      <select id="status" v-model="state.status">
        <option value="ativa">Ativa</option>
        <option value="parada">Parada</option>
        <option value="manutencao">Em manutenção</option>
      </select>
    </div>

    <div class="form-actions">
      <button type="submit" :disabled="submitting" class="btn-primary">
        {{ submitting ? 'Salvando...' : (edit ? '✓ Salvar alterações' : '+ Adicionar máquina') }}
      </button>

      <button
        v-if="edit"
        type="button"
        class="btn-secondary"
        @click="handleCancel"
      >
        ✕ Cancelar
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  initial: { type: Object, default: null },
  submitting: { type: Boolean, default: false },
  edit: { type: Boolean, default: false }
});

const emit = defineEmits(["submit", "cancel"]);

const state = reactive({
  nome: "",
  tipo: "",
  status: "ativa"
});

watch(
  () => props.initial,
  (val) => {
    if (val) {
      state.nome = val.nome || "";
      state.tipo = val.tipo || "";
      state.status = val.status || "ativa";
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

function onSubmit() {
  emit("submit", {
    nome: state.nome.trim(),
    tipo: state.tipo.trim(),
    status: state.status
  });

  if (!props.edit) {
    resetForm();
  }
}

function handleCancel() {
  resetForm();
  emit("cancel");
}

function resetForm() {
  state.nome = "";
  state.tipo = "";
  state.status = "ativa";
}
</script>

<style scoped>
.maquina-form {
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
}

.form-group {
  display: flex !important;
  flex-direction: column !important;
  gap: 6px !important;
}

.form-group label {
  font-weight: 600 !important;
  color: #ffffff !important;
  font-size: 0.95rem !important;
}

/* FORÇAR MUITO as cores dos inputs e select */
.form-group input,
.form-group select {
  padding: 10px 12px !important;
  border-radius: 8px !important;
  border: 2px solid #e0e0e0 !important;
  font-size: 1rem !important;
  background: #ffffff !important;
  color: #2c3e50 !important;
  transition: all 0.2s ease !important;
  box-sizing: border-box !important;
}

/* FORÇAR placeholder */
.form-group input::placeholder {
  color: #95a5a6 !important;
  opacity: 1 !important;
}

/* FORÇAR foco */
.form-group input:focus,
.form-group select:focus {
  border-color: #667eea !important;
  outline: none !important;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15) !important;
  background: #ffffff !important;
  color: #2c3e50 !important;
}

/* FORÇAR select options */
.form-group select option {
  background: #ffffff !important;
  color: #2c3e50 !important;
}

.form-actions {
  display: flex !important;
  gap: 10px !important;
  margin-top: 8px !important;
}

.btn-primary,
.btn-secondary {
  padding: 10px 18px !important;
  border-radius: 8px !important;
  border: none !important;
  cursor: pointer !important;
  font-weight: 600 !important;
  transition: all 0.2s ease !important;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2) !important;
  color: #fff !important;
  flex: 1 !important;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3) !important;
}

.btn-primary:disabled {
  background: #bdc3c7 !important;
  cursor: not-allowed !important;
}

.btn-secondary {
  background: #e0e0e0 !important;
  color: #555 !important;
}

.btn-secondary:hover {
  background: #d0d0d0 !important;
  transform: translateY(-2px) !important;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column !important;
  }

  .btn-primary,
  .btn-secondary {
    width: 100% !important;
  }
}
</style>
