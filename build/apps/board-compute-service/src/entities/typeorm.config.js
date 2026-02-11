"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const board_entity_1 = require("./board.entity");
exports.typeOrmConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'boards',
    entities: [board_entity_1.Board],
    synchronize: process.env.NODE_ENV !== 'production', // Auto-sync in dev only
    logging: process.env.NODE_ENV !== 'production',
};
//# sourceMappingURL=typeorm.config.js.map