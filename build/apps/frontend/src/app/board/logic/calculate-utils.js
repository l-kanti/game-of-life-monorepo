"use strict";
// Utilities for calculating next board state
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNextBoardState = calculateNextBoardState;
// Game of Life rules as named constants
const MIN_NEIGHBORS_TO_SURVIVE = 2;
const MAX_NEIGHBORS_TO_SURVIVE = 3;
const NEIGHBORS_TO_REPRODUCE = 3;
// All possible neighbor offsets (dx, dy)
const ALL_OFFSETS = [
    [-1, -1],
    [-1, 0],
    [-1, 1], // top-left,    top,    top-right
    [0, -1],
    [0, 1], // left,                right
    [1, -1],
    [1, 0],
    [1, 1], // bottom-left, bottom, bottom-right
];
/**
 * Returns the next board state based on the current board state.
 *
 * @param board - The current board state
 * @returns The next board state
 */
function calculateNextBoardState(board) {
    return board.map((row, xPos) => row.map((_, yPos) => nextTileState(board, xPos, yPos)));
}
/**
 * Returns the next state of a tile based on the current board state.
 *
 * Follows Conway's Game of Life rules:
 * - A live cell survives with 2-3 neighbors
 * - A live cell dies with <2 neighbors (underpopulation)
 * - A live cell dies with >3 neighbors (overpopulation)
 * - A dead cell with exactly 3 neighbors becomes alive (reproduction)
 *
 * Cells outside the board boundaries are assumed to be dead (false).
 *
 * @param board - The board state
 * @param xPos  - The x position of the tile
 * @param yPos  - The y position of the tile
 * @returns The next state of the tile (true = alive, false = dead)
 */
function nextTileState(board, xPos, yPos) {
    const currentlyAlive = board[xPos][yPos];
    const numLivingNeighbors = countLivingNeighbors(board, xPos, yPos);
    return currentlyAlive
        ? numLivingNeighbors >= MIN_NEIGHBORS_TO_SURVIVE &&
            numLivingNeighbors <= MAX_NEIGHBORS_TO_SURVIVE
        : numLivingNeighbors === NEIGHBORS_TO_REPRODUCE;
}
/**
 * Counts the number of living neighbors for a given cell.
 *
 * Only considers the 8 adjacent cells (horizontal, vertical, and diagonal).
 * Cells outside the board boundaries are treated as dead.
 *
 * @param board - The board state
 * @param x     - The x position of the tile
 * @param y     - The y position of the tile
 * @returns The number of living neighbors (0-8)
 */
function countLivingNeighbors(board, x, y) {
    const numRows = board.length;
    const numColumns = board[0].length;
    return (ALL_OFFSETS
        // Filter out of bounds neighbors
        .filter(([dx, dy]) => dx + x >= 0 && dy + y >= 0 && dx + x < numRows && dy + y < numColumns)
        // Map true => 1, false => 0
        .map(([dx, dy]) => (board[x + dx][y + dy] ? 1 : 0))
        // Sum of living neighbors
        .reduce((acc, val) => acc + val, 0));
}
//# sourceMappingURL=calculate-utils.js.map