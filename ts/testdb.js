"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3_1 = require("sqlite3");
var sqlite_1 = require("sqlite");
var CRUD_1 = require("./CRUD");
//This is usefull to open the database
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var db, tables, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, (0, sqlite_1.open)({
                        filename: 'Sources/videogamesDB/videogames.db',
                        driver: sqlite3_1.Database,
                    })];
            case 1:
                db = _a.sent();
                console.log('Succesfull conexion from the database');
                return [4 /*yield*/, db.all("SELECT name FROM sqlite_master WHERE type='table';" //SQL Strings Commands
                    )];
            case 2:
                tables = _a.sent();
                console.log('tables found it', tables);
                return [4 /*yield*/, db.close()];
            case 3:
                _a.sent(); //Close the datababse
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error('Issues found when try to connect the database', error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); })();
//This is usefull open data from different tables 
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var db, users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, (0, sqlite_1.open)({
                        filename: 'Sources/videogamesDB/videogames.db',
                        driver: sqlite3_1.Database,
                    })];
            case 1:
                db = _a.sent();
                console.log('Database Conection Succesfull');
                return [4 /*yield*/, db.all('SELECT * FROM Users')];
            case 2:
                users = _a.sent();
                console.log('Data from Users:', users);
                return [4 /*yield*/, db.close()];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error('ISsues found it on the database', error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); })();
//Test CRUD
function testCRUDCompany() {
    return __awaiter(this, void 0, void 0, function () {
        var companyCreate, companies, selectedcompany, company, companiesAfterDeletion, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, (0, CRUD_1.createCompany)({ company_name: 'Naughty Dogs' })];
                case 1:
                    companyCreate = _a.sent();
                    console.log('Created Company ID:', companyCreate);
                    return [4 /*yield*/, (0, CRUD_1.getAllCompanies)()];
                case 2:
                    companies = _a.sent();
                    selectedcompany = companies.find(function (c) { return c.company_name === 'Rockstar'; });
                    console.log('All Companies:', companies);
                    console.log("Selected company:", selectedcompany);
                    return [4 /*yield*/, (0, CRUD_1.getCompanyByID)(selectedcompany.Id)];
                case 3:
                    company = _a.sent();
                    console.log('Company by ID:', company);
                    // DELETE: Delete a company
                    return [4 /*yield*/, (0, CRUD_1.deleteCompanyByID)(selectedcompany.Id)];
                case 4:
                    // DELETE: Delete a company
                    _a.sent();
                    console.log("Company with ID ".concat(companyCreate, " deleted."));
                    return [4 /*yield*/, (0, CRUD_1.getAllCompanies)()];
                case 5:
                    companiesAfterDeletion = _a.sent();
                    console.log('Companies after deletion:', companiesAfterDeletion);
                    console.log('--- Tests Completed Successfully ---');
                    return [3 /*break*/, 7];
                case 6:
                    error_3 = _a.sent();
                    console.error('Error during tests:', error_3.message);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
testCRUDCompany();
