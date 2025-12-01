const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Storage em memória
const users = [];
const maquinas = [];
let userId = 1;
let maquinaId = 1;

// USERS
app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Nome e email obrigatórios' });
  const user = { _id: userId++, name, email, role: role || 'user', createdAt: new Date() };
  users.push(user);
  res.status(201).json(user);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = users.findIndex(u => u._id === id);
  if (idx === -1) return res.status(404).json({ error: 'Não encontrado' });
  users.splice(idx, 1);
  res.status(204).send();
});

// MAQUINAS
app.get('/maquinas', (req, res) => {
  res.json(maquinas);
});

app.post('/maquinas', (req, res) => {
  const { nome, tipo, status } = req.body;
  if (!nome || !tipo) return res.status(400).json({ error: 'Nome e tipo obrigatórios' });
  const maq = { _id: maquinaId++, nome, tipo, status: status || 'ativa', dataCriacao: new Date() };
  maquinas.push(maq);
  res.status(201).json(maq);
});

app.delete('/maquinas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = maquinas.findIndex(m => m._id === id);
  if (idx === -1) return res.status(404).json({ error: 'Não encontrado' });
  maquinas.splice(idx, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`\n✅ API rodando em http://localhost:${PORT}\n`);
});
