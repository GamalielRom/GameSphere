"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3_1 = require("sqlite3");
var sqlite_1 = require("sqlite");
var dbPromise = (0, sqlite_1.open)({
    filename: 'Sources/videogamesDB/videogames.db',
    driver: sqlite3_1.Database,
});
exports.default = dbPromise;
