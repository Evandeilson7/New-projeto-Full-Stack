// MemoryDB - Armazenamento em memória para teste sem MongoDB
class MemoryDB {
  constructor() {
    this.users = [];
    this.maquinas = [];
    this.userIdCounter = 1;
    this.maquinaIdCounter = 1;
  }

  // USUÁRIOS
  findUser(id) {
    return this.users.find(u => u._id === id);
  }

  findAllUsers() {
    return [...this.users];
  }

  createUser(data) {
    const user = {
      _id: this.userIdCounter++,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  updateUser(id, data) {
    const idx = this.users.findIndex(u => u._id === id);
    if (idx === -1) return null;
    this.users[idx] = { ...this.users[idx], ...data, updatedAt: new Date() };
    return this.users[idx];
  }

  deleteUser(id) {
    const idx = this.users.findIndex(u => u._id === id);
    if (idx === -1) return false;
    this.users.splice(idx, 1);
    return true;
  }

  // MÁQUINAS
  findMaquina(id) {
    return this.maquinas.find(m => m._id === id);
  }

  findAllMaquinas() {
    return [...this.maquinas];
  }

  createMaquina(data) {
    const maquina = {
      _id: this.maquinaIdCounter++,
      ...data,
      dataCriacao: new Date()
    };
    this.maquinas.push(maquina);
    return maquina;
  }

  updateMaquina(id, data) {
    const idx = this.maquinas.findIndex(m => m._id === id);
    if (idx === -1) return null;
    this.maquinas[idx] = { ...this.maquinas[idx], ...data };
    return this.maquinas[idx];
  }

  deleteMaquina(id) {
    const idx = this.maquinas.findIndex(m => m._id === id);
    if (idx === -1) return false;
    this.maquinas.splice(idx, 1);
    return true;
  }
}

// Exportar instância única
const db = new MemoryDB();
module.exports = db;
