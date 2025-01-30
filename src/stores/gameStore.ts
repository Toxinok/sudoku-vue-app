import { defineStore } from "pinia";
import { SudokuGenerator } from "../utils/sudokuGenerator";

export const useGameStore = defineStore("game", {
    state: () => ({
        grid: [] as { value: number; prefilled: boolean; error: boolean }[][],
        solution: [] as number[][],
        errors: 0,
    }),
    actions: {
        generateNewGame(difficulty: string) {
            const generator = new SudokuGenerator();
            const { puzzle, solution } = generator.generatePuzzle(difficulty);
            this.grid = puzzle.map((row) =>
                row.map((value) => ({
                    value,
                    prefilled: value !== 0,
                    error: false,
                }))
            );
            this.solution = solution;
            this.errors = 0;
        },
        handleInput(row: number, col: number, value: number) {
            if (this.solution[row][col] === value) {
                this.grid[row][col].value = value;
                this.grid[row][col].error = false;
            } else {
                this.grid[row][col].error = true;
                this.grid[row][col].value = value;
                this.errors++;
            }
        },
    },
});
