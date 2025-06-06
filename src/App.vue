<template>
  <div class="app-container">
    <ParticleBackground class="background" />
    <div class="content">
      <WelcomeHeader />
      <div class="grid-container">
        <FeatureCard
          v-for="(feature, index) in features"
          :key="index"
          :feature="feature"
          :delay="index * 0.1"
        />
      </div>
      <QuickLinks />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ParticleBackground from './components/ParticleBackground.vue'
import WelcomeHeader from './components/WelcomeHeader.vue'
import FeatureCard from './components/FeatureCard.vue'
import QuickLinks from './components/QuickLinks.vue'

const features = ref([
  {
    title: 'Development',
    command: 'pnpm dev',
    description: 'Start local development server',
    icon: '💻'
  },
  {
    title: 'Build',
    command: 'pnpm build',
    description: 'Build for production',
    icon: '🛠️'
  },
  {
    title: 'Testing',
    command: 'pnpm test',
    description: 'Run unit tests',
    icon: '🧪'
  },
  {
    title: 'Linting',
    command: 'pnpm lint',
    description: 'Check code quality',
    icon: '🔍'
  }
])
</script>

<style scoped>
.app-container {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}
</style>
