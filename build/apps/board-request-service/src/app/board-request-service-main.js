"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const board_request_service_module_1 = require("./board-request-service.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(board_request_service_module_1.BoardRequestModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors();
    await app.listen(3000);
    console.log('Board Request Service (REST API) is running on port 3000');
}
bootstrap();
//# sourceMappingURL=board-request-service-main.js.map