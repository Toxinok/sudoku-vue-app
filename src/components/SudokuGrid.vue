<template>
  <div class="sudoku-grid">
    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
      <SudokuCell
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          :cell="cell"
          @input="handleInput(rowIndex, colIndex, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGameStore } from "@/stores/gameStore";
import SudokuCell from "./SudokuCell.vue";

const gameStore = useGameStore();
const grid = computed(() => gameStore.grid);

const handleInput = (row: number, col: number, value: number) => {
  gameStore.handleInput(row, col, value);
};
</script>

<style scoped>
.sudoku-grid {
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  margin: 20px auto;
  width: 400px;
  height: 400px;
  border: 2px solid #000;
}

.row {
  display: flex;
}

.row:nth-child(3n):not(:nth-child(9n)) {
  border-bottom: 2px solid #000;
}

.cell {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #ccc;
}

.cell:nth-child(3n) {
  border-right: 2px solid #000;
}

@keyframes highlight {
  0% { background-color: #ffff99; }
  100% { background-color: transparent; }
}

.highlight {
  animation: highlight 1s ease-in-out;
}
</style>