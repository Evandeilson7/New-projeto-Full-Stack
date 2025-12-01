const mongoose = require('mongoose');

const maquinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipo: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['ativa', 'parada', 'manutencao'], 
    default: 'ativa' 
  },
  dataCriacao: { type: Date, default: Date.now }
});

const Maquina = mongoose.model('Maquina', maquinaSchema);
module.exports = Maquina;
