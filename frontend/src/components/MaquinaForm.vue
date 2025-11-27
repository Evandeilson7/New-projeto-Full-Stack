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
        {{ submitting ? 'Salvando...' : (edit ? 'Salvar alterações' : 'Adicionar máquina') }}
      </button>

      <button
        v-if="edit"
        type="button"
        class="btn-secondary"
        @click="handleCancel"
      >
        Cancelar
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
  color: #2c3e50;
  font-size: 0.95rem;
}

.form-group input,
.form-group select {
  padding: 10px 12px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  font-size: 1rem;
  transition: all 0.2s ease;
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

.btn-primary:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.btn-secondary {
  background: #e0e0e0;
  color: #555;
}
</style>
