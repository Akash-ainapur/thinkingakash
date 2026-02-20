<script setup>
import { ref, onMounted } from 'vue'

const board = ref(Array(9).fill(null))
const isUserTurn = ref(true)
const status = ref('Your turn (O)')
const winner = ref(null)

const checkWinner = (b) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b1, c] = lines[i]
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
      return b[a]
    }
  }
  return b.includes(null) ? null : 'tie'
}

const minimax = (b, depth, isMaximizing) => {
  const result = checkWinner(b)
  if (result === 'X') return 10 - depth
  if (result === 'O') return depth - 10
  if (result === 'tie') return 0

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < 9; i++) {
      if (b[i] === null) {
        b[i] = 'X'
        let score = minimax(b, depth + 1, false)
        b[i] = null
        bestScore = Math.max(score, bestScore)
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < 9; i++) {
      if (b[i] === null) {
        b[i] = 'O'
        let score = minimax(b, depth + 1, true)
        b[i] = null
        bestScore = Math.min(score, bestScore)
      }
    }
    return bestScore
  }
}

const computerMove = () => {
  let bestScore = -Infinity
  let move = null
  for (let i = 0; i < 9; i++) {
    if (board.value[i] === null) {
      board.value[i] = 'X'
      let score = minimax(board.value, 0, false)
      board.value[i] = null
      if (score > bestScore) {
        bestScore = score
        move = i
      }
    }
  }
  board.value[move] = 'X'
  const finalResult = checkWinner(board.value)
  if (finalResult) {
    declareWinner(finalResult)
  } else {
    isUserTurn.value = true
    status.value = 'Your turn (O)'
  }
}

const userMove = (index) => {
  if (!isUserTurn.value || board.value[index] || winner.value) return
  board.value[index] = 'O'
  const result = checkWinner(board.value)
  if (result) {
    declareWinner(result)
  } else {
    isUserTurn.value = false
    status.value = 'Machine is thinking...'
    setTimeout(computerMove, 500)
  }
}

const declareWinner = (res) => {
  winner.value = res
  if (res === 'tie') status.value = "It's a tie!"
  else status.value = `${res === 'X' ? 'Machine' : 'You'} wins!`
}

const reset = () => {
  board.value = Array(9).fill(null)
  isUserTurn.value = true
  winner.value = null
  status.value = 'Your turn (O)'
}
</script>

<template>
  <div class="game-container pixel-border">
    <div class="status-bar">{{ status }}</div>
    <div class="grid">
      <div 
        v-for="(cell, i) in board" 
        :key="i" 
        class="cell"
        @click="userMove(i)"
      >
        {{ cell }}
      </div>
    </div>
    <button class="reset-btn" @click="reset">REBOOT</button>
  </div>
</template>

<style scoped>
.game-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
}

.status-bar {
  background: #000;
  color: var(--pixel-green);
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  font-family: var(--font-mono);
  font-size: 1.1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  background: #000;
  padding: 12px;
  width: 100%;
  aspect-ratio: 1 / 1;
  box-sizing: border-box;
}

.cell {
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-family: 'Press Start 2P';
  cursor: pointer;
  min-width: 0;
}

.cell:hover { background: #333; }

.reset-btn {
  margin-top: 2rem;
  background: var(--pixel-gold);
  border: none;
  padding: 0.8rem 1.5rem;
  font-family: 'Press Start 2P';
  font-size: 0.9rem;
  cursor: pointer;
}

@media (max-width: 600px) {
  .cell {
    font-size: 2rem;
  }
  
  .status-bar {
    font-size: 0.9rem;
  }
}
</style>
