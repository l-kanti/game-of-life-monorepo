"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    displayName: 'board-compute-service',
    preset: '../../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/apps/board-compute-service',
};
//# sourceMappingURL=jest.config.cjs.map