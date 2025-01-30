import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SudokuCell from "../SudokuCell.vue";

describe("SudokuCell", () => {
    it("renders a prefilled cell correctly", () => {
        const wrapper = mount(SudokuCell, {
            props: {
                cell: { value: 5, prefilled: true, error: false },
            },
        });
        expect(wrapper.find("input").element.disabled).toBe(true);
        expect(wrapper.find("input").classes()).toContain("prefilled");
    });

    it("renders an error cell correctly", () => {
        const wrapper = mount(SudokuCell, {
            props: {
                cell: { value: 5, prefilled: false, error: true },
            },
        });
        expect(wrapper.find("input").classes()).toContain("error");
    });

    it("emits input event correctly", async () => {
        const wrapper = mount(SudokuCell, {
            props: {
                cell: { value: 0, prefilled: false, error: false },
            },
        });
        await wrapper.find("input").setValue("7");
        expect(wrapper.emitted("input")).toBeTruthy();
        expect(wrapper.emitted("input")![0]).toEqual([7]);
    });
});