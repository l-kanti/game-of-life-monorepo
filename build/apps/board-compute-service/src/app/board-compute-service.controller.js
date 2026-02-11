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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardComputeController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const board_compute_service_service_1 = require("./board-compute-service.service");
let BoardComputeController = class BoardComputeController {
    constructor(boardComputeService) {
        this.boardComputeService = boardComputeService;
    }
    async getBoards(data) {
        const result = await this.boardComputeService.getBoards(data.gameId, data.numTicks, data.lastTick);
        // Map snake_case to camelCase to match protobuf
        return {
            gameId: result.game_id,
            lastTick: result.last_tick,
            boards: result.boards,
        };
    }
    async getBoardsReplay(data) {
        return await this.boardComputeService.getBoardsReplay(data.gameId);
    }
    async createBoard(data) {
        const board = data.board.rows.map((row) => row.cells);
        const result = await this.boardComputeService.createBoard(board);
        return {
            gameId: result.game_id,
            lastTick: result.last_tick,
            boards: result.boards,
        };
    }
};
exports.BoardComputeController = BoardComputeController;
__decorate([
    (0, microservices_1.GrpcMethod)('BoardRequestService', 'GetBoards'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardComputeController.prototype, "getBoards", null);
__decorate([
    (0, microservices_1.GrpcMethod)('BoardRequestService', 'GetBoardsReplay'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardComputeController.prototype, "getBoardsReplay", null);
__decorate([
    (0, microservices_1.GrpcMethod)('BoardRequestService', 'CreateBoard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardComputeController.prototype, "createBoard", null);
exports.BoardComputeController = BoardComputeController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [board_compute_service_service_1.BoardComputeService])
], BoardComputeController);
//# sourceMappingURL=board-compute-service.controller.js.map