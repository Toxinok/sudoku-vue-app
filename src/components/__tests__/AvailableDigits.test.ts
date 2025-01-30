import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import AvailableDigits from "../AvailableDigits.vue";
import { useGameStore } from "@/stores/gameStore";
import { setActivePinia, createPinia } from "pinia";
import {nextTick} from "vue";

describe("AvailableDigits", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("renders all digits correctly", () => {
        const wrapper = mount(AvailableDigits);
        const digits = wrapper.findAll(".digit");

        expect(digits.length).toBe(9);
        expect(digits[0].text()).toBe("1");
        expect(digits[8].text()).toBe("9");
    });

    it("grays out digits when fully used", async () => {
        const store = useGameStore();

        store.grid = Array.from({ length: 9 }, (_, rowIndex) => {
            return Array.from({ length: 9 }, (_, colIndex) => {
                return rowIndex === 0 ? { value: 1, prefilled: false, error: false } : { value: 0, prefilled: false, error: false };
            });
        });

        const wrapper = mount(AvailableDigits);

        await nextTick();

        const digit1 = wrapper.findAll(".digit").find((el) => el.text() === "1");

        expect(digit1).not.toBeUndefined();
        expect(digit1!.classes()).toContain("used");
    });
});