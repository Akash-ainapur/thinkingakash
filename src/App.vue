<template>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  
  <!-- Loom Attribution Overlay -->
  <div class="loom-attribution">
    <div class="loom-avatar">🧶</div>
    <div class="loom-text">
      DESIGNED & MANAGED BY <br>
      <span>LOOM</span> [AKASH'S PERSONAL ASSISTANT]
    </div>
  </div>
</template>

<style scoped>
.loom-attribution {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid var(--pixel-gold);
  padding: 8px 12px;
  z-index: 9999;
  font-family: 'VT323', monospace;
  pointer-events: none;
  image-rendering: pixelated;
}

.loom-avatar {
  font-size: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

.loom-text {
  font-size: 0.7rem;
  color: #888;
  line-height: 1.2;
}

.loom-text span {
  color: var(--pixel-gold);
  font-weight: bold;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@media (max-width: 600px) {
  .loom-attribution {
    bottom: 10px;
    right: 10px;
    padding: 6px 10px;
  }
}
</style>
