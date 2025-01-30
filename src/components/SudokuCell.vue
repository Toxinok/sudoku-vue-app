<template>
  <input
      type="number"
      min="1"
      max="9"
      :value="cell.value || ''"
      :disabled="cell.prefilled"
      @input="onInput"
      @keydown="onKeyDown"
      :class="{ error: cell.error, prefilled: cell.prefilled }"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  cell: { value: number; prefilled: boolean; error: boolean };
}>();

const emit = defineEmits(["input"]);

const onInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  let value = parseInt(inputElement.value);

  // Allow empty input (backspace/delete)
  if (isNaN(value)) {
    emit("input", 0); // Emit 0 to clear the cell
    return;
  }

  // Restrict input to numbers between 1 and 9
  if (value < 1 || value > 9) {
    value = Math.max(1, Math.min(9, value)); // Clamp value between 1 and 9
    inputElement.value = value.toString(); // Update the input field
  }

  emit("input", value);
};

const onKeyDown = (event: KeyboardEvent) => {
  // Allow only numeric keys, backspace, and delete
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Tab",
  ];

  if (
      !allowedKeys.includes(event.key) &&
      (event.key.length !== 1 || !/\d/.test(event.key))
  ) {
    event.preventDefault(); // Prevent invalid input
  }

  // Replace the existing value when a new number is typed
  if (event.key.length === 1 && /\d/.test(event.key)) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = ""; // Clear the input field to allow direct replacement
  }
};
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

input{
  padding: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 18px;
  border: 1px solid #616161;
}

input:nth-child(3n):not(:nth-child(9n)) {
  border-right: 2px solid #000;
}

input:disabled {
  background-color: #f0f0f0;
  font-weight: bold;
}

.error {
  background-color: #ffcccc;
}

.prefilled {
  background-color: #e0e0e0;
}
</style>