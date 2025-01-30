import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import GameControls from "../GameControls.vue";
import { useGameStore } from "@/stores/gameStore";
import { setActivePinia, createPinia } from "pinia";

describe("GameControls", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("changes difficulty and starts a new game", async () => {
        const store = useGameStore();
        const spy = vi.spyOn(store, "generateNewGame");
        const wrapper = mount(GameControls);

        await wrapper.find("select").setValue("intermediate");
        expect(spy).toHaveBeenCalledWith("intermediate");
    });

    it("disables hint button after 10 hints", async () => {
        const wrapper = mount(GameControls);
        const store = useGameStore();
        store.generateNewGame("beginner");

        for (let i = 0; i < 10; i++) {
            await wrapper.find("button").trigger("click");
        }
        expect(wrapper.find("button").element.disabled).toBe(true);
    });
});