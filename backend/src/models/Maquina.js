// Maquina.js (para usar com CommonJS)
const mongoose = require('mongoose'); // Se você estiver usando Mongoose, mude para require

const maquinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  // Adicione outros campos do seu esquema aqui
  // Por exemplo:
  // ip: { type: String, required: true, unique: true },
  // status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
  // dataCriacao: { type: Date, default: Date.now }
});

const Maquina = mongoose.model('Maquina', maquinaSchema);
module.exports = Maquina; // Exporta usando CommonJS
