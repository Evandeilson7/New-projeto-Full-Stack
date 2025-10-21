import mongoose from 'mongoose';

const maquinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipo: { type: String, required: true },
  status: { type: String, enum: ['ativa', 'inativa', 'manutencao'], default: 'ativa' },
  dataInstalacao: { type: Date, default: Date.now },
  localizacao: { type: String, required: true }
});

export default mongoose.model('Maquina', maquinaSchema);
