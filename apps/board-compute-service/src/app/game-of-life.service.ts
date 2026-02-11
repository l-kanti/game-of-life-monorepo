import { Injectable } from '@nestjs/common';

@Injectable()
export class GameOfLifeService {
  /**
   * Calculate the next state of the board based on Conway's Game of Life rules
   */
  calculateNextGeneration(grid: boolean[][]): boolean[][] {
    const rows = grid.length;
    const cols = grid[0]?.length || 0;
    
    const nextGrid: boolean[][] = Array(rows)
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
        } else {
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
  private countLiveNeighbors(grid: boolean[][], row: number, col: number): number {
    const rows = grid.length;
    const cols = grid[0]?.length || 0;
    let count = 0;

    // Check all 8 adjacent cells
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1],
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
  generateTicks(initialGrid: boolean[][], numTicks: number): boolean[][][] {
    const results: boolean[][][] = [];
    let currentGrid = initialGrid;

    for (let i = 0; i < numTicks; i++) {
      currentGrid = this.calculateNextGeneration(currentGrid);
      results.push(currentGrid);
    }

    return results;
  }
}
