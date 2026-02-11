"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
describe('GET /api', () => {
    it('should return a message', async () => {
        const res = await axios_1.default.get(`/api`);
        expect(res.status).toBe(200);
        expect(res.data).toEqual({ message: 'Hello API' });
    });
});
//# sourceMappingURL=board-request-service.spec.js.map