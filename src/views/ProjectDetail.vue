<script setup>
import { useRoute } from 'vue-router'
import projects from '../data/projects.json'
import TicTacToe from '../components/TicTacToe.vue'

const route = useRoute()
const project = projects.find(p => p.id === route.params.id)

const formatContent = (text) => {
  if (!text) return ''
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="external-link">${url}</a>`
  })
}
</script>

<template>
  <div v-if="project" class="container">
    <router-link to="/" class="back-btn"><- BACK_TO_SYSTEM</router-link>
    
    <header>
      <span class="tag">{{ project.tag }}</span>
      <h2 class="project-title">{{ project.title }}</h2>
    </header>

    <div v-if="project.isGame" class="game-section">
      <p class="summary">TEST LOG: Unbeatable Logic Verification</p>
      <TicTacToe />
      
      <div class="technical-log pixel-border python-logic">
        <div class="log-header">LOGIC_EXPLANATION: backend_mind.py</div>
        <div class="logic-content">
          <p>The core logic is powered by a custom implementation of the <strong>Minimax Algorithm</strong>. Here's how the backend brain works:</p>
          <ul>
            <li><strong>Recursive Simulation:</strong> The bot simulates every possible move (255,168 states) before making its own.</li>
            <li><strong>Score Optimization:</strong> It assigns a score (+10 for a win, -10 for a loss) and plays to maximize its score while assuming you play perfectly to minimize it.</li>
            <li><strong>Alpha-Beta Pruning:</strong> To keep it fast, it "prunes" (ignores) branches of the move-tree that won't lead to a better outcome.</li>
          </ul>
          <div class="code-snippet">
            <pre><code># The core logic
def minimax(board, depth, is_maximizing):
    score = evaluate(board)
    if score == 10: return score - depth
    if score == -10: return score + depth
    if not moves_left(board): return 0
    ...</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="content-section">
      <div v-if="project.media" class="media-container pixel-border">
        <img v-if="project.media.type === 'image'" :src="project.media.url" />
        <video v-if="project.media.type === 'video'" controls :src="project.media.url" />
        <embed v-if="project.media.type === 'pdf'" :src="project.media.url" type="application/pdf" width="100%" height="600px" />
      </div>
      
      <div class="technical-log pixel-border">
        <div class="log-header">PROJECT_DETAIL_DUMP.txt</div>
        <p v-html="formatContent(project.content)"></p>
      </div>

      <div v-if="project.feedback" class="technical-log pixel-border feedback-log">
        <div class="log-header">AUDIENCE_FEEDBACK_LOG.txt</div>
        <ul class="feedback-list">
          <li v-for="msg in project.feedback" :key="msg">>> {{ msg }}</li>
        </ul>
      </div>

      <div class="metrics-row">
        <div v-for="(val, key) in project.metrics" :key="key" class="metric">
          <span class="label">[{{ key.toUpperCase() }}]:</span>
          <span class="value">{{ val }}</span>
        </div>
      </div>

      <div v-if="project.proofs" class="proof-gallery">
        <div v-for="proof in project.proofs" :key="proof.url" class="proof-item pixel-border">
          <div class="log-header">{{ proof.label }}.jpg</div>
          <img :src="proof.url" />
        </div>
      </div>
    </div>
    
    <!-- Spacer for Loom -->
    <div class="bottom-spacer"></div>
  </div>
  
  <div v-else class="container">
    <h2>404 - LOG NOT FOUND</h2>
    <router-link to="/" class="back-btn">RETURN HOME</router-link>
  </div>
</template>

<style scoped>
.tag {
  color: var(--pixel-gold);
  font-family: var(--font-mono);
  font-size: 1rem;
}

.project-title {
  word-break: break-all;
  line-height: 1.2;
}

.technical-log {
  background: #000;
  margin-top: 2rem;
  font-family: 'VT323';
  line-height: 1.4;
  overflow: hidden;
}

.log-header {
  border-bottom: 2px solid #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  color: #555;
  font-size: 0.8rem;
}
.feedback-log {
  margin-top: 1.5rem;
  border-color: var(--pixel-blue);
}

.feedback-list {
  list-style: none;
  padding: 0;
  font-size: 1.1rem;
  color: var(--pixel-green);
}

.feedback-list li {
  margin-bottom: 0.5rem;
}

.python-logic {
  margin-top: 2rem;
  border-color: var(--pixel-gold);
  text-align: left;
}

.logic-content {
  padding: 1rem;
}

.logic-content ul {
  list-style: none;
  padding-left: 0;
  margin: 1rem 0;
}

.logic-content li {
  margin-bottom: 0.8rem;
  color: #ccc;
  font-size: 1.1rem;
}

.logic-content li strong {
  color: var(--pixel-gold);
}

.code-snippet {
  background: #111;
  padding: 1rem;
  border-left: 4px solid var(--pixel-gold);
  font-family: 'VT323', monospace;
  margin-top: 1rem;
  overflow-x: auto;
}

.code-snippet pre {
  margin: 0;
}

.code-snippet code {
  color: var(--pixel-green);
  white-space: pre-wrap;
  word-break: break-all;
}

.metrics-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.metric {
  border: 2px solid var(--pixel-gold);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  max-width: 100%;
  word-break: break-word;
}

.metric .label { color: #888; margin-right: 8px; }

.proof-gallery {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 4rem;
}

.proof-item {
  width: 100%;
}

.proof-item img {
  width: 100%;
  height: auto;
  display: block;
  image-rendering: pixelated;
}

.bottom-spacer {
  height: 120px;
}

@media (max-width: 600px) {
  .metric {
    width: 100%;
  }
}
</style>
