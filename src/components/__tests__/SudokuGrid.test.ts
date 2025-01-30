import { describe, it, expect, vi, beforeEach } from "vitest";
import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import SudokuGrid from "../SudokuGrid.vue";
import { useGameStore } from "@/stores/gameStore";
import { setActivePinia, createPinia } from "pinia";

describe("SudokuGrid", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("renders the grid correctly", () => {
        const store = useGameStore();
        store.generateNewGame("beginner");

        const wrapper = mount(SudokuGrid);
        expect(wrapper.findAll(".row").length).toBe(9);
        expect(wrapper.findAll("input").length).toBe(81);
    });

    it("calls handleInput when a cell is updated", async () => {
        const store = useGameStore();
        store.generateNewGame("beginner");
        const spy = vi.spyOn(store, "handleInput");

        const wrapper =  mount(SudokuGrid);
        await wrapper.find("input").setValue("5");
        await nextTick()

        expect(spy).toHaveBeenCalledWith(0,0,5);
    });
});