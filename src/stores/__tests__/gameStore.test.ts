import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useGameStore } from "../gameStore";

describe("gameStore", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("generates a new game with the correct difficulty", () => {
        const store = useGameStore();
        store.generateNewGame("beginner");
        expect(store.grid.length).toBe(9);
        expect(store.grid[0].length).toBe(9);
        expect(store.solution.length).toBe(9);
        expect(store.solution[0].length).toBe(9);
    });

    it("validates user input correctly", () => {
        const store = useGameStore();
        store.generateNewGame("beginner");
        const solutionValue = store.solution[0][0];
        store.handleInput(0, 0, solutionValue);
        expect(store.grid[0][0].value).toBe(solutionValue);
        expect(store.grid[0][0].error).toBe(false);

        store.handleInput(0, 0, solutionValue + 1);
        expect(store.grid[0][0].error).toBe(true);
        expect(store.errors).toBe(1);
    });
});