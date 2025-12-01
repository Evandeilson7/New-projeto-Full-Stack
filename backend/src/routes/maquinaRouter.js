const express = require('express');
const Maquina = require('../models/Maquina.js');
const memoryDB = require('../config/memory.js');
const router = express.Router();

// Ver todas as máquinas
router.get('/', async (req, res) => {
  try {
    try {
      // Tenta usar MongoDB
      const maquinas = await Maquina.find();
      res.json(maquinas);
    } catch (mongoError) {
      // Se MongoDB falhar, usa memory
      console.log("📝 Usando MemoryDB para buscar máquinas");
      const maquinas = memoryDB.findAllMaquinas();
      res.json(maquinas);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar uma máquina nova
router.post('/', async (req, res) => {
  try {
    const { nome, tipo, status } = req.body;

    // Validação básica
    if (!nome || !tipo) {
      return res.status(400).json({ error: "Nome e tipo são obrigatórios" });
    }

    try {
      // Tenta usar MongoDB
      const maquina = new Maquina(req.body);
      await maquina.save();
      res.status(201).json(maquina);
    } catch (mongoError) {
      // Se MongoDB falhar, usa memory
      console.log("📝 Usando MemoryDB para salvar máquina");
      const maquina = memoryDB.createMaquina({ nome, tipo, status: status || "ativa" });
      res.status(201).json(maquina);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Modificar uma máquina
router.put('/:id', async (req, res) => {
  try {
    try {
      // Tenta usar MongoDB
      const maquina = await Maquina.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(maquina);
    } catch (mongoError) {
      // Se MongoDB falhar, usa memory
      const maquina = memoryDB.updateMaquina(parseInt(req.params.id), req.body);
      if (!maquina) return res.status(404).json({ error: "Máquina não encontrada" });
      res.json(maquina);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar uma máquina
router.delete('/:id', async (req, res) => {
  try {
    try {
      // Tenta usar MongoDB
      await Maquina.findByIdAndDelete(req.params.id);
      res.json({ message: 'Máquina deletada com sucesso' });
    } catch (mongoError) {
      // Se MongoDB falhar, usa memory
      const deleted = memoryDB.deleteMaquina(parseInt(req.params.id));
      if (!deleted) return res.status(404).json({ error: "Máquina não encontrada" });
      res.json({ message: 'Máquina deletada com sucesso' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
