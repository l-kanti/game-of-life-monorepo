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
exports.BoardRequestController = void 0;
const common_1 = require("@nestjs/common");
const board_request_service_service_1 = require("./board-request-service.service");
const board_dto_1 = require("../dto/board.dto");
let BoardRequestController = class BoardRequestController {
    constructor(boardRequestService) {
        this.boardRequestService = boardRequestService;
    }
    async createBoard(createBoardDto) {
        try {
            return await this.boardRequestService.createBoard(createBoardDto.board);
        }
        catch (error) {
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getBoards(getBoardsDto) {
        try {
            return await this.boardRequestService.getBoards(getBoardsDto.gameId, getBoardsDto.ticks, getBoardsDto.last_tick);
        }
        catch (error) {
            if (error.status === common_1.HttpStatus.FORBIDDEN) {
                throw error;
            }
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getReplay(getReplayDto) {
        try {
            return await this.boardRequestService.getReplay(getReplayDto.gameId);
        }
        catch (error) {
            if (error.status === common_1.HttpStatus.FORBIDDEN) {
                throw error;
            }
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.BoardRequestController = BoardRequestController;
__decorate([
    (0, common_1.Post)('board'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [board_dto_1.CreateBoardDto]),
    __metadata("design:returntype", Promise)
], BoardRequestController.prototype, "createBoard", null);
__decorate([
    (0, common_1.Get)('board'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [board_dto_1.GetBoardsDto]),
    __metadata("design:returntype", Promise)
], BoardRequestController.prototype, "getBoards", null);
__decorate([
    (0, common_1.Get)('replays/board'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [board_dto_1.GetReplayDto]),
    __metadata("design:returntype", Promise)
], BoardRequestController.prototype, "getReplay", null);
exports.BoardRequestController = BoardRequestController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [board_request_service_service_1.BoardRequestService])
], BoardRequestController);
//# sourceMappingURL=board-request-service.controller.js.map