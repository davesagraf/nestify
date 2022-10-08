"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../src/entity/user.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'dave',
    password: 'mazomedik',
    database: 'nestify_db',
    synchronize: true,
    logging: false,
    entities: [user_entity_1.UserEntity],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map