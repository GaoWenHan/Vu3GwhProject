<template>
  <div class="quick-links">
    <h3>Quick Links</h3>
    <div class="links-container">
      <a
        v-for="(link, index) in links"
        :key="index"
        :href="link.url"
        target="_blank"
        class="link-item"
        :style="{ '--delay': `${0.2 + index * 0.1}s` }"
      >
        <div class="link-icon">{{ link.icon }}</div>
        <div>
          <div class="link-title">{{ link.title }}</div>
          <div class="link-desc">{{ link.description }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const links = [
  {
    title: 'Vue 3 Docs',
    description: 'Official Vue 3 documentation',
    url: 'https://vuejs.org/',
    icon: '📚'
  },
  {
    title: 'TypeScript',
    description: 'TypeScript documentation',
    url: 'https://www.typescriptlang.org/',
    icon: '⌨️'
  },
  {
    title: 'Webpack',
    description: 'Webpack documentation',
    url: 'https://webpack.js.org/',
    icon: '📦'
  },
  {
    title: 'GitHub Repo',
    description: 'Project repository',
    url: '#',
    icon: '🐙'
  }
]
</script>

<style scoped>
.quick-links {
  margin-top: 3rem;
}

h3 {
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.links-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.link-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.4s ease var(--delay) forwards;
  text-decoration: none;
}

.link-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px) !important;
}

.link-icon {
  font-size: 1.8rem;
}

.link-title {
  color: white;
  font-weight: 500;
}

.link-desc {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
