import express from 'express';
import Maquina from '../models/Maquina.js';



const router = express.Router();

// Ver todas as máquinas
router.get('/', async (req, res) => {
  try {
    const maquinas = await Maquina.find();
    res.json(maquinas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar uma máquina nova
router.post('/', async (req, res) => {
  try {
    const maquina = new Maquina(req.body);
    await maquina.save();
    res.status(201).json(maquina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Modificar uma máquina
router.put('/:id', async (req, res) => {
  try {
    const maquina = await Maquina.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(maquina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar uma máquina
router.delete('/:id', async (req, res) => {
  try {
    await Maquina.findByIdAndDelete(req.params.id);
    res.json({ message: 'Máquina deletada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
