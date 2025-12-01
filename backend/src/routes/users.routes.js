const { Router } = require("express");
const User = require("../models/User.js");
const memoryDB = require("../config/memory.js");

const router = Router();

// Função auxiliar para usar MongoDB ou Memory
async function tryMongoDB(operation) {
  try {
    return await operation();
  } catch (err) {
    // Se MongoDB falhar, usa memory
    throw err;
  }
}

// CREATE - POST /api/users
router.post("/", async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Validação básica
    if (!name || !email) {
      return res.status(400).json({ error: "Nome e email são obrigatórios" });
    }

    try {
      // Tenta usar MongoDB
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (mongoError) {
      // Se MongoDB falhar, usa memory
      console.log("📝 Usando MemoryDB para salvar usuário");
      const user = memoryDB.createUser({ name, email, role: role || "user" });
      return res.status(201).json(user);
    }
  } catch (err) {
    return res.status(400).json({ error: "Erro ao criar usuário", details: err.message });
  }
});

// READ (lista) - GET /api/users
router.get("/", async (_req, res) => {
  try {
    try {
      // Tenta usar MongoDB
      const users = await User.find().sort({ createdAt: -1 });
      return res.json(users);
    } catch (mongoError) {
      // Se MongoDB falhar, usa memory
      console.log("📝 Usando MemoryDB para buscar usuários");
      const users = memoryDB.findAllUsers();
      return res.json(users);
    }
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// READ (um) - GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    try {
      // Tenta usar MongoDB
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
      return res.json(user);
    } catch (mongoError) {
      // Se MongoDB falhar, usa memory
      const user = memoryDB.findUser(parseInt(req.params.id));
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
      return res.json(user);
    }
  } catch (err) {
    return res.status(400).json({ error: "ID inválido" });
  }
});

// UPDATE - PUT /api/users/:id
router.put("/:id", async (req, res) => {
  try {
    try {
      // Tenta usar MongoDB
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
      return res.json(user);
    } catch (mongoError) {
      // Se MongoDB falhar, usa memory
      const user = memoryDB.updateUser(parseInt(req.params.id), req.body);
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
      return res.json(user);
    }
  } catch (err) {
    return res.status(400).json({ error: "Erro ao atualizar", details: err.message });
  }
});

// DELETE - DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    try {
      // Tenta usar MongoDB
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
      return res.status(204).send();
    } catch (mongoError) {
      // Se MongoDB falhar, usa memory
      const deleted = memoryDB.deleteUser(parseInt(req.params.id));
      if (!deleted) return res.status(404).json({ error: "Usuário não encontrado" });
      return res.status(204).send();
    }
  } catch (err) {
    return res.status(400).json({ error: "ID inválido" });
  }
});

module.exports = router;
