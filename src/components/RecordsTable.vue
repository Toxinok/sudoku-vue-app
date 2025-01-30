<template>
  <div class="records-table">
    <h2>Top Scores</h2>
    <div v-for="(records, difficulty) in topScores" :key="difficulty" class="difficulty-section">
      <h3>{{ difficulty }}</h3>
      <ul>
        <li v-for="(score, index) in records" :key="index">
          {{ index + 1 }}. {{ score }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface TopScores {
  [difficulty: string]: number[];
}

const topScores = ref<TopScores>({
  beginner: [],
  intermediate: [],
  hard: [],
  expert: [],
});

onMounted(() => {
  loadRecords();
});

const loadRecords = () => {
  const records = localStorage.getItem("sudokuRecords");
  if (records) {
    topScores.value = JSON.parse(records);
  }
};
</script>

<style scoped>
.records-table {
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.difficulty-section {
  margin-bottom: 15px;
}

h3 {
  margin-bottom: 5px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}
</style>