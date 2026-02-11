"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const board_compute_service_module_1 = require("./board-compute-service.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(board_compute_service_module_1.BoardComputeModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            package: 'board',
            protoPath: (0, path_1.join)(__dirname, '../proto/board_request_service.proto'),
            url: '0.0.0.0:5000',
        },
    });
    await app.listen();
    console.log('Board Compute Service (gRPC) is running on port 5000');
}
bootstrap();
//# sourceMappingURL=board-compute-service-main.js.map