"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameOfLifeService = void 0;
const common_1 = require("@nestjs/common");
let GameOfLifeService = class GameOfLifeService {
    /**
     * Calculate the next state of the board based on Conway's Game of Life rules
     */
    calculateNextGeneration(grid) {
        const rows = grid.length;
        const cols = grid[0]?.length || 0;
        const nextGrid = Array(rows)
            .fill(null)
            .map(() => Array(cols).fill(false));
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const neighbors = this.countLiveNeighbors(grid, row, col);
                const isAlive = grid[row][col];
                if (isAlive) {
                    // Rule 2: Survival - 2 or 3 neighbors
                    // Rule 1: Underpopulation - fewer than 2 neighbors dies
                    // Rule 3: Overpopulation - more than 3 neighbors dies
                    nextGrid[row][col] = neighbors === 2 || neighbors === 3;
                }
                else {
                    // Rule 4: Reproduction - exactly 3 neighbors becomes alive
                    nextGrid[row][col] = neighbors === 3;
                }
            }
        }
        return nextGrid;
    }
    /**
     * Count live neighbors for a given cell
     */
    countLiveNeighbors(grid, row, col) {
        const rows = grid.length;
        const cols = grid[0]?.length || 0;
        let count = 0;
        // Check all 8 adjacent cells
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1],
        ];
        for (const [dRow, dCol] of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            // Check boundaries
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                if (grid[newRow][newCol]) {
                    count++;
                }
            }
        }
        return count;
    }
    /**
     * Generate multiple ticks/generations
     */
    generateTicks(initialGrid, numTicks) {
        const results = [];
        let currentGrid = initialGrid;
        for (let i = 0; i < numTicks; i++) {
            currentGrid = this.calculateNextGeneration(currentGrid);
            results.push(currentGrid);
        }
        return results;
    }
};
exports.GameOfLifeService = GameOfLifeService;
exports.GameOfLifeService = GameOfLifeService = __decorate([
    (0, common_1.Injectable)()
], GameOfLifeService);
//# sourceMappingURL=game-of-life.service.js.map