<template>
  <div class="available-digits">
    <h2>Available Digits</h2>
    <div class="digits">
      <div
          v-for="digit in digits"
          :key="digit"
          class="digit"
          :class="{ used: isDigitUsed(digit) }"
      >
        {{ digit }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGameStore } from "@/stores/gameStore";

const gameStore = useGameStore();
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const isDigitUsed = (digit: number) => {
  // Count how many times the digit appears in the grid
  const count = gameStore.grid.flat().filter((cell) => cell.value === digit).length;
  console.log(count)

  // A digit is "used" if it appears 9 times (all possible instances in Sudoku)
  return count === 9;
};
</script>

<style scoped>
.available-digits {
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2 {
  margin-bottom: 10px;
}

.digits {
  display: inline-flex;
  gap: 10px;
  flex-wrap: wrap;
}

.digit {
  padding: 5px 10px;
  background-color: #e0e0e0;
  border-radius: 3px;
}

.digit.used {
  background-color: #ccc;
  color: #888;
}
</style>