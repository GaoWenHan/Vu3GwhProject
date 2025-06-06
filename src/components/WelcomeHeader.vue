<template>
  <header class="welcome-header">
    <img src="../assets/logo.png" alt="Vue Logo" class="logo" />
    <h1 class="title">Welcome to Your Vue Project</h1>
    <p class="subtitle">A modern Vue 3 + TypeScript + Webpack starter</p>
  </header>
</template>

<script setup lang="ts">
// No logic needed for now
</script>
<style scoped>
.welcome-header {
  text-align: center;
  padding: 2rem 0;
  margin-bottom: 2rem;
  position: relative;
  z-index: 10;
}

.logo {
  height: 100px;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 10px rgba(66, 185, 131, 0.5));
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 15px rgba(66, 185, 131, 0.8));
}

.title {
  font-size: 2.5rem;
  margin: 0;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  animation: fadeInDown 0.8s ease;
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0.5rem 0 0;
  animation: fadeIn 1s ease 0.3s both;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
