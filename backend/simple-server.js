const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Storage em memória
const storage = {
  users: [],
  maquinas: []
};

// ===== ROTAS USUÁRIOS =====
app.get('/users', (req, res) => {
  console.log('📋 GET /users');
  res.json(storage.users);
});

app.post('/users', (req, res) => {
  console.log('➕ POST /users', req.body);
  const user = {
    _id: Date.now(),
    ...req.body,
    createdAt: new Date()
  };
  storage.users.push(user);
  console.log('✅ Usuário salvo:', user);
  res.status(201).json(user);
});

app.delete('/users/:id', (req, res) => {
  console.log('🗑️ DELETE /users/:id', req.params.id);
  storage.users = storage.users.filter(u => u._id != req.params.id);
  res.json({ message: 'Deletado' });
});

// ===== ROTAS MÁQUINAS =====
app.get('/maquinas', (req, res) => {
  console.log('📋 GET /maquinas');
  res.json(storage.maquinas);
});

app.post('/maquinas', (req, res) => {
  console.log('➕ POST /maquinas', req.body);
  const maquina = {
    _id: Date.now(),
    ...req.body,
    dataCriacao: new Date()
  };
  storage.maquinas.push(maquina);
  console.log('✅ Máquina salva:', maquina);
  res.status(201).json(maquina);
});

app.delete('/maquinas/:id', (req, res) => {
  console.log('🗑️ DELETE /maquinas/:id', req.params.id);
  storage.maquinas = storage.maquinas.filter(m => m._id != req.params.id);
  res.json({ message: 'Deletado' });
});

// Iniciar
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log('📊 Storage:', storage);
});
