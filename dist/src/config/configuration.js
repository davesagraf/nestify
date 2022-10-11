"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        type: process.env.DB_TYPE,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    jwtConstants: {
        secret: process.env.API_SECRET,
    },
});
//# sourceMappingURL=configuration.js.map