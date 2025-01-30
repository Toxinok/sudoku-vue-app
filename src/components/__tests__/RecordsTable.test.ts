import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import RecordsTable from "../RecordsTable.vue";

describe("RecordsTable", () => {
    beforeEach(() => {
        // Mock localStorage
        const records = {
            beginner: [100, 90, 80],
            intermediate: [95, 85, 75],
        };
        vi.spyOn(Storage.prototype, "getItem").mockReturnValue(JSON.stringify(records));
    });

    it("displays records correctly", async () => {
        const wrapper = mount(RecordsTable);
        await wrapper.vm.$nextTick(); // Wait for the component to update

        expect(wrapper.text()).toContain("beginner");
        expect(wrapper.text()).toContain("intermediate");
        expect(wrapper.text()).toContain("100");
        expect(wrapper.text()).toContain("95");
    });
});