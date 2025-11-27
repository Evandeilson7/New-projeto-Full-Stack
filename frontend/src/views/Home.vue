<template>
  <div class="home-container">
    <h2></h2>

    <div class="cards-grid">
      <router-link to="/usuarios" class="card">
        <div class="card-icon">👥</div>
        <h2>Usuários</h2>
        <p>Gerencie os usuários do sistema</p>
        <button class="card-button">Acessar →</button>
      </router-link>

      <router-link to="/maquinas" class="card">
        <div class="card-icon">🏭</div>
        <h2>Máquinas</h2>
        <p>Gerencie as máquinas do sistema</p>
        <button class="card-button">Acessar →</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// nada aqui por enquanto
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  color: #fff;
}

.cards-grid {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  text-decoration: none;
  color: #2c3e50;
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
