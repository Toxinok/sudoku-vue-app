import { describe, it, expect } from "vitest";
import { SudokuGenerator } from "../sudokuGenerator";

describe("SudokuGenerator", () => {
    const generator = new SudokuGenerator();

    it("generates a valid Sudoku solution", () => {
        const solution = generator.generateSolution();
        expect(solution.length).toBe(9);
        expect(solution[0].length).toBe(9);
        // Check if all rows, columns, and 3x3 boxes are valid
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const num = solution[i][j];
                expect(num).toBeGreaterThanOrEqual(1);
                expect(num).toBeLessThanOrEqual(9);
                // Check row, column, and box for duplicates
                for (let k = 0; k < 9; k++) {
                    if (k !== j) expect(solution[i][k]).not.toBe(num);
                    if (k !== i) expect(solution[k][j]).not.toBe(num);
                }
                const boxRow = Math.floor(i / 3) * 3;
                const boxCol = Math.floor(j / 3) * 3;
                for (let x = boxRow; x < boxRow + 3; x++) {
                    for (let y = boxCol; y < boxCol + 3; y++) {
                        if (x !== i && y !== j) expect(solution[x][y]).not.toBe(num);
                    }
                }
            }
        }
    });

    it("generates a puzzle with the correct number of empty cells for each difficulty", () => {
        const difficulties = ["beginner", "intermediate", "hard", "expert"];
        const expectedEmptyCells = [41, 45, 49, 53];

        difficulties.forEach((difficulty, index) => {
            const { puzzle } = generator.generatePuzzle(difficulty);
            const emptyCells = puzzle.flat().filter((cell) => cell === 0).length;
            expect(emptyCells).toBe(expectedEmptyCells[index]);
        });
    });
});