const express = require('express');
const mongoose = require('mongoose');
const app = express();
const maquinaRoutes = require('./routes/maquinaRouter');

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/maquinas')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar MongoDB:', err));

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Rota principal para verificar se a API está funcionando
app.get('/', (req, res) => {
  res.send('API de Máquinas funcionando! Acesse /maquinas para as rotas de máquina.');
});

// Usa as rotas de máquina com um prefixo /maquinas
app.use('/maquinas', maquinaRoutes);

// Porta em que o servidor vai rodar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
