<template>
  <div class="home-container">
    <div class="header">
      <h1>🏭 Sistema de Gerenciamento</h1>
      <p class="subtitle">Bem-vindo ao sistema!</p>
    </div>

    <div class="cards-grid">
      <router-link to="/usuarios" class="card">
        <div class="card-icon">👥</div>
        <h2>Usuários</h2>
        <p>Gerencie os usuários do sistema</p>
        <button class="card-button">Acessar →</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Versão simplificada - SEM buscar dados
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.header {
  text-align: center;
  margin-bottom: 50px;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
}

.cards-grid {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  max-width: 400px;
  text-align: center;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.card-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.card h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 15px;
}

.card p {
  color: #7f8c8d;
  margin-bottom: 25px;
  font-size: 1.1rem;
}

.card-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
}
</style>
