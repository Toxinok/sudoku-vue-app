<template>
  <div id="app">
    <h1>Sudoku Game</h1>
    <div class="game-container">
      <GameControls />
      <SudokuGrid />
      <AvailableDigits />
      <RecordsTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameControls from "./components/GameControls.vue";
import SudokuGrid from "./components/SudokuGrid.vue";
import AvailableDigits from "./components/AvailableDigits.vue";
import RecordsTable from "./components/RecordsTable.vue";
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
}

.game-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>