Vue
Copiar
<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <h1 class="logo">🏭 Sistema de Gerenciamento</h1>
        <nav class="nav-menu">
          <RouterLink to="/" class="nav-link">
            <span class="nav-icon">🏠</span>
            Home
          </RouterLink>
          <RouterLink to="/usuarios" class="nav-link">
            <span class="nav-icon">👥</span>
            Usuários
          </RouterLink>
          <RouterLink to="/maquinas" class="nav-link">
            <span class="nav-icon">🏭</span>
            Máquinas
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>

    <footer class="app-footer">
      <p>Sistema Full Stack - Node.js + Vue.js + MongoDB</p>
    </footer>
  </div>
</template>

<script setup>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  color: #2c3e50;
  font-weight: 700;
}

.nav-menu {
  display: flex;
  gap: 10px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  text-decoration: none;
  color: #7f8c8d;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: #f8f9fa;
  color: #2c3e50;
}

.nav-link.router-link-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.nav-icon {
  font-size: 1.2rem;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
}

.app-footer {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-align: center;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.app-footer p {
  font-size: 0.9rem;
  opacity: 0.9;
}
</style>
