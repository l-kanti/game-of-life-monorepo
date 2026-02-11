"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@nx/node/utils");
/* eslint-disable */
module.exports = async function () {
    // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
    // Hint: `globalThis` is shared between setup and teardown.
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    await (0, utils_1.killPort)(port);
    console.log(globalThis.__TEARDOWN_MESSAGE__);
};
//# sourceMappingURL=global-teardown.js.map