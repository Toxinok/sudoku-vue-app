export class SudokuGenerator {
    private size: number = 9;
    private boxSize: number = 3;

    generateSolution(): number[][] {
        const grid: number[][] = Array.from({ length: this.size }, () =>
            Array.from({ length: this.size }, () => 0)
        );
        this.solve(grid);
        return grid;
    }

    private solve(grid: number[][]): boolean {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= this.size; num++) {
                        if (this.isValid(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (this.solve(grid)) return true;
                            grid[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    private isValid(grid: number[][], row: number, col: number, num: number): boolean {
        for (let i = 0; i < this.size; i++) {
            if (grid[row][i] === num || grid[i][col] === num) return false;
        }
        const boxRow = Math.floor(row / this.boxSize) * this.boxSize;
        const boxCol = Math.floor(col / this.boxSize) * this.boxSize;
        for (let i = 0; i < this.boxSize; i++) {
            for (let j = 0; j < this.boxSize; j++) {
                if (grid[boxRow + i][boxCol + j] === num) return false;
            }
        }
        return true;
    }

    generatePuzzle(difficulty: string): { puzzle: number[][]; solution: number[][] } {
        const solution = this.generateSolution();
        const puzzle = solution.map((row) => row.slice());
        const cellsToRemove = this.getCellsToRemove(difficulty);

        for (let i = 0; i < cellsToRemove; i++) {
            const row = Math.floor(Math.random() * this.size);
            const col = Math.floor(Math.random() * this.size);
            if (puzzle[row][col] !== 0) {
                puzzle[row][col] = 0;
            } else {
                i--;
            }
        }
        return { puzzle, solution };
    }

    private getCellsToRemove(difficulty: string): number {
        switch (difficulty) {
            case "beginner":
                return 41;
            case "intermediate":
                return 45;
            case "hard":
                return 49;
            case "expert":
                return 53;
            default:
                return 41;
        }
    }
}