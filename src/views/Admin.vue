<script setup>
import { ref, onMounted } from 'vue'
import projectsData from '../data/projects.json'

const projects = ref([...projectsData])
const status = ref('READY_FOR_INPUT')

const addNewProject = () => {
  const id = `project-${Date.now()}`
  projects.value.unshift({
    id,
    title: 'NEW_ENTRY_TITLE',
    tag: 'GENERAL',
    summary: 'A short one-line summary.',
    content: 'Write your detailed story here...',
    media: { type: 'image', url: '' }
  })
  status.value = 'NEW_PROJECT_ADDED'
  setTimeout(() => { status.value = 'READY_FOR_INPUT' }, 2000)
}

const removeProject = (id) => {
  if (confirm('Delete this log entry permanently?')) {
    projects.value = projects.value.filter(p => p.id !== id)
  }
}

const saveToLocal = () => {
  localStorage.setItem('nexus_portfolio_draft', JSON.stringify(projects.value))
  status.value = 'DRAFT_SAVED_LOCALLY'
  setTimeout(() => { status.value = 'READY_FOR_INPUT' }, 2000)
}

const syncWithLoom = () => {
  status.value = 'SYNCING_WITH_LOOM...'
  // We'll print to console for the agent to read
  console.log('AGENT_SYNC_DATA:', JSON.stringify(projects.value))
  alert('Please tell Loom: "Loom, sync my admin changes now." I will then read the data and update your files!')
}

onMounted(() => {
  const saved = localStorage.getItem('nexus_portfolio_draft')
  if (saved) {
    projects.value = JSON.parse(saved)
  }
})
</script>

<template>
  <div class="container admin-view">
    <router-link to="/" class="back-btn"><- EXIT_ADMIN_MODE</router-link>
    
    <header>
      <h2>SYSTEM_ADMIN_PANEL</h2>
      <p class="status">MODE: {{ status }}</p>
      <button class="add-btn pixel-border" @click="addNewProject">+ CREATE_NEW_LOG_ENTRY</button>
    </header>

    <div class="editor-grid">
      <div v-for="project in projects" :key="project.id" class="project-editor pixel-border">
        <div class="editor-top">
          <span class="tag">{{ project.tag }}</span>
          <button class="delete-btn" @click="removeProject(project.id)">[DELETE]</button>
        </div>
        <div class="input-group">
          <label>TITLE:</label>
          <input v-model="project.title" type="text" />
        </div>
        <div class="input-group">
          <label>TAG (e.g., CAREER, AI):</label>
          <input v-model="project.tag" type="text" />
        </div>
        <div class="input-group">
          <label>SUMMARY (One-liner):</label>
          <input v-model="project.summary" type="text" />
        </div>
        <div class="input-group">
          <label>DETAILED LOG (Your Story):</label>
          <textarea v-model="project.content" rows="6"></textarea>
        </div>
        <div class="input-group">
          <label>MEDIA URL (Optional):</label>
          <input v-if="project.media" v-model="project.media.url" type="text" placeholder="https://..." />
          <button v-else @click="project.media = { type: 'image', url: '' }">ADD MEDIA ATTACHMENT</button>
        </div>
      </div>
    </div>

    <div class="admin-actions pixel-border">
      <button class="save-btn" @click="saveToLocal">SAVE DRAFT</button>
      <button class="sync-btn" @click="syncWithLoom">SYNC WITH LOOM [CRITICAL]</button>
    </div>
  </div>
</template>

<style scoped>
.admin-view { padding-bottom: 10rem; }

.add-btn {
  margin-top: 2rem;
  background: var(--pixel-gold);
  color: #000;
}

.editor-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.delete-btn {
  background: none;
  color: #500;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  padding: 0;
}

.delete-btn:hover { color: #f00; }

.editor-grid {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 2rem;
}

.project-editor {
  background: #111;
  padding: 2rem;
}

.input-group {
  margin: 1.5rem 0;
}

label {
  display: block;
  font-size: 0.8rem;
  color: #555;
  margin-bottom: 0.5rem;
}

input, textarea {
  width: 100%;
  background: #000;
  border: 2px solid #222;
  color: var(--cozy-beige);
  padding: 1rem;
  font-family: 'VT323';
  font-size: 1.2rem;
}

input:focus, textarea:focus {
  border-color: var(--pixel-green);
  outline: none;
}

.metric-input {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.metric-input span { font-size: 0.8rem; color: var(--pixel-blue); width: 100px; }

.admin-actions {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  background: #1a1a1a;
  z-index: 100;
}

button {
  padding: 1rem 2rem;
  font-family: 'Press Start 2P';
  font-size: 0.7rem;
  cursor: pointer;
  border: none;
}

.save-btn { background: var(--pixel-blue); color: #000; }
.sync-btn { background: var(--pixel-green); color: #000; }
</style>
