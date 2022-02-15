"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql = void 0;
const pg_1 = require("@databases/pg");
Object.defineProperty(exports, "sql", { enumerable: true, get: function () { return pg_1.sql; } });
const db = (0, pg_1.default)('postgres://postgres:password@localhost:5432/fm');
exports.default = db;
//# sourceMappingURL=dbconfig.js.map