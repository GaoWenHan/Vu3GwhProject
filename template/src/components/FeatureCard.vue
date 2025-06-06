<template>
  <div class="feature-card" :style="{ '--delay': `${delay}s` }">
    <div class="icon">{{ feature.icon }}</div>
    <h3>{{ feature.title }}</h3>
    <p>{{ feature.description }}</p>
    <div class="command">{{ feature.command }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  feature: {
    title: string
    command: string
    description: string
    icon: string
  }
  delay: number
}>()
</script>

<style scoped>
.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease var(--delay) forwards;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.feature-card:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.15);
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

h3 {
  margin: 0 0 0.5rem;
  color: white;
  font-size: 1.5rem;
}

p {
  margin: 0 0 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.command {
  font-family: monospace;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: #42b983;
  display: inline-block;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
