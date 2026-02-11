"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardComputeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const board_entity_1 = require("../entities/board.entity");
const game_of_life_service_1 = require("./game-of-life.service");
const uuid_1 = require("uuid");
let BoardComputeService = class BoardComputeService {
    constructor(boardRepository, gameOfLifeService) {
        this.boardRepository = boardRepository;
        this.gameOfLifeService = gameOfLifeService;
    }
    async createBoard(initialGrid) {
        const gameId = (0, uuid_1.v4)();
        const numTicks = 10;
        // Save initial state (tick 0)
        await this.saveBoardState(gameId, 0, initialGrid);
        // Generate next 10 ticks
        const ticks = this.gameOfLifeService.generateTicks(initialGrid, numTicks);
        // Save all generated ticks
        for (let i = 0; i < ticks.length; i++) {
            await this.saveBoardState(gameId, i + 1, ticks[i]);
        }
        return {
            game_id: parseInt(gameId.replace(/-/g, '').substring(0, 8), 16), // Convert UUID to int for response
            last_tick: numTicks,
            boards: ticks.map((grid) => this.convertToProtoGrid(grid)),
        };
    }
    async getBoards(gameId, numTicks, lastTick) {
        // Get the last known state from the database
        const lastBoard = await this.boardRepository.findOne({
            where: { gameId: gameId.toString(), tick: lastTick },
            order: { tick: 'DESC' },
        });
        if (!lastBoard) {
            throw new Error('Board not found');
        }
        // Generate next ticks from last known state
        const ticks = this.gameOfLifeService.generateTicks(lastBoard.grid, numTicks);
        // Save all generated ticks
        for (let i = 0; i < ticks.length; i++) {
            await this.saveBoardState(gameId.toString(), lastTick + i + 1, ticks[i]);
        }
        return {
            game_id: gameId,
            last_tick: lastTick + numTicks,
            boards: ticks.map((grid) => this.convertToProtoGrid(grid)),
        };
    }
    async getBoardsReplay(gameId) {
        // Fetch all boards for this game from database
        const boards = await this.boardRepository.find({
            where: { gameId: gameId.toString() },
            order: { tick: 'ASC' },
        });
        return {
            boards: boards.map((board) => this.convertToProtoGrid(board.grid)),
        };
    }
    async saveBoardState(gameId, tick, grid) {
        const board = this.boardRepository.create({
            gameId,
            tick,
            grid,
        });
        await this.boardRepository.save(board);
    }
    convertToProtoGrid(grid) {
        return {
            rows: grid.map((row) => ({ cells: row })),
        };
    }
};
exports.BoardComputeService = BoardComputeService;
exports.BoardComputeService = BoardComputeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        game_of_life_service_1.GameOfLifeService])
], BoardComputeService);
//# sourceMappingURL=board-compute-service.service.js.map