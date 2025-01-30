<template>
  <div class="game-controls">
    <div class="control-group">
      <label for="difficulty">Level:</label>
      <select id="difficulty" v-model="selectedDifficulty" @change="startNewGame">
        <option value="beginner">Easy</option>
        <option value="intermediate">Intermediate</option>
        <option value="hard">Hard</option>
        <option value="expert">Expert</option>
      </select>
    </div>
    <div class="control-group">
      <span>Score: {{ score }}</span>
    </div>
    <div class="control-group">
      <span>Time Spent: {{ formattedTime }}</span>
    </div>
    <div class="control-group">
      <button @click="giveHint" :disabled="hintsUsed >= 10">Hint ({{ 10 - hintsUsed }} left)</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch, onUnmounted} from "vue";
import { useGameStore } from "@/stores/gameStore";

const gameStore = useGameStore();
const selectedDifficulty = ref("beginner");
const hintsUsed = ref(0);
const startTime = ref(Date.now());
const elapsedTime = ref(0);
const timerInterval = ref<number | null>(null);

const formattedTime = computed(() => {
  const minutes = Math.floor(elapsedTime.value / 60);
  const seconds = elapsedTime.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

const score = computed(() => {
  const correctCells = gameStore.grid.flat().filter((cell) => cell.value !== 0 && !cell.error).length;
  const hintPenalty = hintsUsed.value * 3 + (hintsUsed.value * (hintsUsed.value - 1)) / 2;
  const errorPenalty = gameStore.errors;
  const timeBonus = 500 - elapsedTime.value;
  return correctCells * 5 - hintPenalty - errorPenalty + timeBonus;
});

const startNewGame = () => {
  gameStore.generateNewGame(selectedDifficulty.value);
  hintsUsed.value = 0;
  startTime.value = Date.now();
  elapsedTime.value = 0;
  if (timerInterval.value) clearInterval(timerInterval.value);
  timerInterval.value = setInterval(() => {
    elapsedTime.value = Math.floor((Date.now() - startTime.value) / 1000);
  }, 1000);
};

const giveHint = () => {
  if (hintsUsed.value < 10) {
    hintsUsed.value++;
    const emptyCells = gameStore.grid
        .flatMap((row, rowIndex) =>
            row.map((cell, colIndex) => ({ rowIndex, colIndex, ...cell }))
        )
        .filter((cell) => cell.value === 0);
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      gameStore.handleInput(randomCell.rowIndex, randomCell.colIndex, gameStore.solution[randomCell.rowIndex][randomCell.colIndex]);
    }
  }
};

onMounted(() => {
  startNewGame();
});

watch(
    () => gameStore.grid,
    (newGrid) => {
      const isComplete = newGrid.flat().every((cell) => cell.value !== 0 && !cell.error);
      if (isComplete) {
        if (timerInterval.value) clearInterval(timerInterval.value);
        saveRecord();
      }
    },
    { deep: true }
);

const saveRecord = () => {
  const records = JSON.parse(localStorage.getItem("sudokuRecords") || "{}");
  const difficulty = selectedDifficulty.value;
  if (!records[difficulty]) records[difficulty] = [];
  records[difficulty].push(score.value);
  records[difficulty].sort((a: number, b: number) => b - a);
  records[difficulty] = records[difficulty].slice(0, 3);
  localStorage.setItem("sudokuRecords", JSON.stringify(records));
};
</script>

<style scoped>
.game-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>