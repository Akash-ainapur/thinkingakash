<script setup>
import projects from '../data/projects.json'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToProject = (id) => {
  router.push(`/project/${id}`)
}
</script>

<template>
  <div class="container">
    <header>
      <h1>AKASH AINAPUR</h1>
      <p class="intro">
        Experimenting till I find it
      </p>
    </header>

    <div class="projects-grid">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="project-card pixel-border"
        @click="navigateToProject(project.id)"
      >
        <span class="project-tag">{{ project.tag }}</span>
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="summary">{{ project.summary }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro {
  margin-top: 1rem;
  color: #666;
  font-style: italic;
}
</style>
