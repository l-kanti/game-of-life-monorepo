"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardComputeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const board_compute_service_controller_1 = require("./board-compute-service.controller");
const board_compute_service_service_1 = require("./board-compute-service.service");
const game_of_life_service_1 = require("./game-of-life.service");
const board_entity_1 = require("../entities/board.entity");
let BoardComputeModule = class BoardComputeModule {
};
exports.BoardComputeModule = BoardComputeModule;
exports.BoardComputeModule = BoardComputeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_NAME,
                entities: [board_entity_1.Board],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([board_entity_1.Board])
        ],
        controllers: [board_compute_service_controller_1.BoardComputeController],
        providers: [board_compute_service_service_1.BoardComputeService, game_of_life_service_1.GameOfLifeService],
    })
], BoardComputeModule);
//# sourceMappingURL=board-compute-service.module.js.map