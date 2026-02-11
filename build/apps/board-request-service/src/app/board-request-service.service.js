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
exports.BoardRequestService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let BoardRequestService = class BoardRequestService {
    constructor(client) {
        this.client = client;
    }
    onModuleInit() {
        this.boardComputeService = this.client.getService('BoardRequestService');
    }
    async createBoard(board) {
        try {
            const boardGrid = this.convertToProtoGrid(board);
            const request = { board: boardGrid };
            const response = await (0, rxjs_1.firstValueFrom)(this.boardComputeService.createBoard(request));
            return {
                gameId: response.gameId,
                lastTick: response.lastTick,
                boards: this.convertProtoGridsToArrays(response.boards),
            };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to create board', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getBoards(gameId, ticks, lastTick) {
        try {
            // ✅ Use generated request/response types
            const request = {
                gameId: gameId,
                numTicks: ticks,
                lastTick: lastTick,
            };
            const response = await (0, rxjs_1.firstValueFrom)(this.boardComputeService.getBoards(request));
            return {
                gameId: response.gameId,
                lastTick: response.lastTick,
                boards: this.convertProtoGridsToArrays(response.boards),
            };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to get boards', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getReplay(gameId) {
        try {
            const request = { gameId: gameId };
            const response = await (0, rxjs_1.firstValueFrom)(this.boardComputeService.getBoardsReplay(request));
            return {
                replay: this.convertProtoGridsToArrays(response.boards),
            };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to get replay', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    convertToProtoGrid(board) {
        return {
            rows: board.map((row) => ({ cells: row })),
        };
    }
    convertProtoGridsToArrays(grids) {
        return grids.map((grid) => grid.rows.map((row) => row.cells));
    }
};
exports.BoardRequestService = BoardRequestService;
exports.BoardRequestService = BoardRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('BOARD_PACKAGE')),
    __metadata("design:paramtypes", [Object])
], BoardRequestService);
//# sourceMappingURL=board-request-service.service.js.map