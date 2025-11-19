// server.js (para usar com CommonJS)
const express = require('express');
const app = express();
const maquinaRoutes = require('./src/routes/maquinaRouter'); // Importa suas rotas de máquina

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
