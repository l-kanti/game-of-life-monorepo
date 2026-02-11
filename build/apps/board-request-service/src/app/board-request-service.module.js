"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardRequestModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const board_request_service_controller_1 = require("./board-request-service.controller");
const board_request_service_service_1 = require("./board-request-service.service");
let BoardRequestModule = class BoardRequestModule {
};
exports.BoardRequestModule = BoardRequestModule;
exports.BoardRequestModule = BoardRequestModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'BOARD_PACKAGE',
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        package: 'board',
                        protoPath: (0, path_1.resolve)('protos/board.proto'),
                        url: 'localhost:5000',
                    },
                },
            ]),
        ],
        controllers: [board_request_service_controller_1.BoardRequestController],
        providers: [board_request_service_service_1.BoardRequestService],
    })
], BoardRequestModule);
//# sourceMappingURL=board-request-service.module.js.map