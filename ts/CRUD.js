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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVideogame = CreateVideogame;
exports.getAllVideogames = getAllVideogames;
exports.getVideogameByID = getVideogameByID;
exports.updateVideogameByID = updateVideogameByID;
exports.deleteVideogameByID = deleteVideogameByID;
exports.createGenre = createGenre;
exports.getAllGenres = getAllGenres;
exports.getGenreByID = getGenreByID;
exports.updateGenreByID = updateGenreByID;
exports.deleteGenreByID = deleteGenreByID;
exports.CreateUser = CreateUser;
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.updateUserByID = updateUserByID;
exports.deleteUserById = deleteUserById;
exports.createReview = createReview;
exports.getAllReviews = getAllReviews;
exports.getReviewById = getReviewById;
exports.updateReviewByID = updateReviewByID;
exports.deleteReviewByID = deleteReviewByID;
exports.createCompany = createCompany;
exports.getAllCompanies = getAllCompanies;
exports.getCompanyByID = getCompanyByID;
exports.updateCompanyByID = updateCompanyByID;
exports.deleteCompanyByID = deleteCompanyByID;
exports.addVideogameToPlataform = addVideogameToPlataform;
exports.getPlataformsForVideogames = getPlataformsForVideogames;
exports.getVideoGamesForPlataforms = getVideoGamesForPlataforms;
exports.RemoveVideogameFromPlatForm = RemoveVideogameFromPlatForm;
exports.addUserFavorites = addUserFavorites;
exports.getAllFavoritesForUser = getAllFavoritesForUser;
exports.removeUserFavorite = removeUserFavorite;
exports.AddGenreToVideogame = AddGenreToVideogame;
exports.removeVideogameGenre = removeVideogameGenre;
exports.getGenresForVideogame = getGenresForVideogame;
var db_1 = require("./db");
//Videogame Table
//Create a Videogame
function CreateVideogame(Videogame) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, values, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "\n                    INSERT INTO Videogames\n                    (gameName, Description, Image, buy_link, game_page_link, critic_rating, user_rating, trophies, Trailer, players, company_id)\n                    VALUES (?,?,?,?,?,?,?,?,?,?,?);\n                ";
                    values = [
                        Videogame.gameName,
                        Videogame.Description,
                        Videogame.Image,
                        Videogame.buy_link,
                        Videogame.game_page_link,
                        Videogame.critic_rating,
                        Videogame.user_rating,
                        Videogame.trophies,
                        Videogame.Trailer,
                        Videogame.players,
                        Videogame.company_id
                    ];
                    return [4 /*yield*/, db.run(query, values)];
                case 2:
                    _a.sent();
                    console.log('Videogame added successfully');
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Cant add this videogame please try again', error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
//Read all videogames
function getAllVideogames() {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, videogames, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "SELECT * FROM Videogames";
                    return [4 /*yield*/, db.all(query)];
                case 2:
                    videogames = _a.sent();
                    return [2 /*return*/, videogames];
                case 3:
                    error_2 = _a.sent();
                    console.error('Impossible to read all the videogames', error_2.message);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
//Read one videogame
function getVideogameByID(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, videogame, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "Select * FROM Videogames WHERE id = ?;";
                    return [4 /*yield*/, db.get(query, id)];
                case 2:
                    videogame = _a.sent();
                    return [2 /*return*/, videogame];
                case 3:
                    error_3 = _a.sent();
                    console.error('Impossible to select the videogame', console.error);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//Update Videogame byID
function updateVideogameByID(id, updates) {
    return __awaiter(this, void 0, void 0, function () {
        var db, videogameExist, fields, values, query, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.get("SELECT 1 FROM Videogames WHERE id = ?;", id)];
                case 2:
                    videogameExist = _a.sent();
                    if (!videogameExist) {
                        throw new Error("Videogame with ID ".concat(id, " does not exist"));
                    }
                    if (Object.keys(updates).length === 0) {
                        throw new Error('Any fields to update');
                    }
                    fields = Object.keys(updates)
                        .map(function (key) { return "".concat(key, " = ?"); })
                        .join(", ");
                    values = Object.values(updates);
                    values.push(id);
                    query = "UPDATE Videogames SET ".concat(fields, " WHERE id = ?;");
                    return [4 /*yield*/, db.run(query, values)];
                case 3:
                    _a.sent();
                    console.log("Videogame with the id of ".concat(id, " Updated"));
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error("Impossible to find this videogame ".concat(id), error_4.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
;
//Delete videogameByID
function deleteVideogameByID(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, videogameExist, query, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.get("SELECT 1 FROM Videogames WHERE id = ?;", id)];
                case 2:
                    videogameExist = _a.sent();
                    if (!videogameExist) {
                        throw new Error("Videogame with ID ".concat(id, " does not exist"));
                    }
                    query = "DELETE FROM Videogames Where id = ?;";
                    return [4 /*yield*/, db.run(query, id)];
                case 3:
                    _a.sent();
                    console.log('Videogame Deleted Sucessfully');
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    console.error('Error deleting the videogame:', error_5.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
;
//GENRES TABLE 
// Add Genre 
function createGenre(Genre) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "\n            INSERT INTO Genres\n                (game_genre)\n            VALUES (?);\n            ";
                    return [4 /*yield*/, db.run(query, [Genre.game_genre])];
                case 2:
                    _a.sent();
                    console.log('Genre added successfully');
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    if (error_6.code === 'SQLITE_CONSTRAINT') {
                        console.error('Genre already exists');
                    }
                    else {
                        console.log('Error trying to add a genre', error_6.message);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
//Read all genres
function getAllGenres() {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, Genres, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "SELECT * FROM Genres ORDER BY game_genre ASC";
                    return [4 /*yield*/, db.all(query)];
                case 2:
                    Genres = _a.sent();
                    return [2 /*return*/, Genres];
                case 3:
                    error_7 = _a.sent();
                    console.error('Something went wrong trying to read the genres', error_7.message);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
//Read one genre
function getGenreByID(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, Genre, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "Select * FROM Genres WHERE id = ?;";
                    return [4 /*yield*/, db.get(query, id)];
                case 2:
                    Genre = _a.sent();
                    if (!Genre) {
                        console.warn("Genre with ID ".concat(id, " not found"));
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, Genre];
                case 3:
                    error_8 = _a.sent();
                    console.error('Something went wrong reading that genre please try again or check if the genre exists', error_8.message);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
//Update Genre By ID
function updateGenreByID(id, updates) {
    return __awaiter(this, void 0, void 0, function () {
        var db, genreExist, fields, values, query, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    if (Object.keys(updates).length === 0) {
                        throw new Error('Any fields to update');
                    }
                    return [4 /*yield*/, db.get("SELECT 1 FROM Genres WHERE id  = ?", id)];
                case 2:
                    genreExist = _a.sent();
                    if (!genreExist) {
                        throw new Error("Genre with ".concat(id, " does not exist"));
                    }
                    fields = Object.keys(updates)
                        .map(function (key) { return "".concat(key, " = ?"); })
                        .join(", ");
                    values = __spreadArray(__spreadArray([], Object.values(updates), true), [id], false);
                    query = "UPDATE Genres SET ".concat(fields, " WHERE id = ?;");
                    return [4 /*yield*/, db.run(query, values)];
                case 3:
                    _a.sent();
                    console.log("Genre with the id of ".concat(id, " Updated"));
                    return [3 /*break*/, 5];
                case 4:
                    error_9 = _a.sent();
                    console.error('Error updating the genre:', error_9.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
;
//DELETE GENRE ByID
function deleteGenreByID(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, genreExist, query, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.get("SELECT 1 FROM Genres WHERE id = ?;", id)];
                case 2:
                    genreExist = _a.sent();
                    if (!genreExist) {
                        throw new Error("Genre with ID ".concat(id, " does not exist"));
                    }
                    query = "DELETE FROM Genres Where id = ?;";
                    return [4 /*yield*/, db.run(query, id)];
                case 3:
                    _a.sent();
                    console.log('Genres Deleted Sucessfully');
                    return [3 /*break*/, 5];
                case 4:
                    error_10 = _a.sent();
                    console.error('Error deleting the genre:', error_10.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//USERS Table
//Create a user
function CreateUser(User) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, values, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "\n                    INSERT INTO Users\n                    (userName, userEmail, userPassword, userPhone)\n                    VALUES (?,?,?,?);\n                ";
                    values = [
                        User.userName,
                        User.userEmail,
                        User.userPassword,
                        User.userPhone
                    ];
                    return [4 /*yield*/, db.run(query, values)];
                case 2:
                    _a.sent();
                    console.log('User added successfully');
                    return [3 /*break*/, 4];
                case 3:
                    error_11 = _a.sent();
                    console.error('Cant add the user please try again', error_11.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
//Read all Users
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, users, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "SELECT * FROM Users";
                    return [4 /*yield*/, db.all(query)];
                case 2:
                    users = _a.sent();
                    return [2 /*return*/, users];
                case 3:
                    error_12 = _a.sent();
                    console.error('Impossible to find all the users');
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
//Read one User by ID
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, user, error_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "Select * FROM Users WHERE id = ?;";
                    return [4 /*yield*/, db.get(query, id)];
                case 2:
                    user = _a.sent();
                    return [2 /*return*/, user];
                case 3:
                    error_13 = _a.sent();
                    console.error('Impossible to find this user', error_13.message);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
//Update Userby id
function updateUserByID(id, updates) {
    return __awaiter(this, void 0, void 0, function () {
        var db, genreExist, fields, values, query, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    if (Object.keys(updates).length === 0) {
                        throw new Error('Any fields to update');
                    }
                    return [4 /*yield*/, db.get("SELECT 1 FROM Users WHERE id  = ?", id)];
                case 2:
                    genreExist = _a.sent();
                    if (!genreExist) {
                        throw new Error("User with ".concat(id, " does not exist"));
                    }
                    fields = Object.keys(updates)
                        .map(function (key) { return "".concat(key, " = ?"); })
                        .join(", ");
                    values = __spreadArray(__spreadArray([], Object.values(updates), true), [id], false);
                    query = "UPDATE Users SET ".concat(fields, " WHERE id = ?;");
                    return [4 /*yield*/, db.run(query, values)];
                case 3:
                    _a.sent();
                    console.log("User with the id of ".concat(id, " Updated"));
                    return [3 /*break*/, 5];
                case 4:
                    error_14 = _a.sent();
                    console.error('Error updating the user:', error_14.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
;
function deleteUserById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, userExist, query, error_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.get("SELECT 1 FROM Users WHERE id = ?;", id)];
                case 2:
                    userExist = _a.sent();
                    if (!userExist) {
                        throw new Error("User with ID ".concat(id, " does not exist"));
                    }
                    query = "DELETE FROM Users Where id = ?;";
                    return [4 /*yield*/, db.run(query, id)];
                case 3:
                    _a.sent();
                    console.log('User Deleted Sucessfully');
                    return [3 /*break*/, 5];
                case 4:
                    error_15 = _a.sent();
                    console.error('Error deleting the User:', error_15.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
;
//Review Table
//Create Review
function createReview(review) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, values, error_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "\n        INSERT INTO Reviews (User_id, Videogame_id, Rating, Comment)\n        VALUES (?,?,?,?)\n        ";
                    values = [
                        review.User_id,
                        review.Videogame_id,
                        review.Rating,
                        review.Comment
                    ];
                    return [4 /*yield*/, db.run(query, values)];
                case 2:
                    _a.sent();
                    console.log('Review added successfully');
                    return [3 /*break*/, 4];
                case 3:
                    error_16 = _a.sent();
                    console.error('Impossible to add this review', error_16.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
//Read all reviews
function getAllReviews() {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, reviews, error_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "\n        SELECT Reviews. *, Users.userName, Videogames.gameName\n        FROM Reviews\n        JOIN Users ON Reviews.User_id = Users.id\n        JOIN Videogames ON Reviews.Videogame_id = Videogames.id;\n        ";
                    return [4 /*yield*/, db.all(query)];
                case 2:
                    reviews = _a.sent();
                    return [2 /*return*/, reviews];
                case 3:
                    error_17 = _a.sent();
                    console.error('Impossible to read all reviews', error_17.message);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//Read review By ID
function getReviewById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, review, error_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "\n        Select Reviews. * Users.userName, Videogames.gameName\n        FROM Reviews\n        JOIN Users ON Reviews.User_id = Users.id\n        JOIN Videogames ON Reviews.Videogame_id = Videogames.id\n        WHERE Reviews.id = ?;\n        ";
                    return [4 /*yield*/, db.get(query, id)];
                case 2:
                    review = _a.sent();
                    return [2 /*return*/, review];
                case 3:
                    error_18 = _a.sent();
                    console.error('Impossible to find this review', error_18.message);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
//Update a review by ID
function updateReviewByID(id, updates) {
    return __awaiter(this, void 0, void 0, function () {
        var db, fields, values, query, error_19;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    if (Object.keys(updates).length === 0) {
                        throw new Error('No fields to update');
                    }
                    fields = Object.keys(updates)
                        .map(function (key) { return "".concat(key, " = ?"); })
                        .join(', ');
                    values = __spreadArray(__spreadArray([], Object.values(updates), true), [id], false);
                    query = "UPDATE Reviews SET ".concat(fields, " WHERE id = ?;");
                    return [4 /*yield*/, db.run(query, values)];
                case 2:
                    _a.sent();
                    console.log("Review with ID ".concat(id, " Updated successfully"));
                    return [3 /*break*/, 4];
                case 3:
                    error_19 = _a.sent();
                    console.error('Error updating the Review', error_19.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
//Remove review
function deleteReviewByID(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, error_20;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "DELETE FROM Reviews WHERE id = ?";
                    return [4 /*yield*/, db.run(query, id)];
                case 2:
                    _a.sent();
                    console.log("Record with id of ".concat(id, " removed successfully"));
                    return [3 /*break*/, 4];
                case 3:
                    error_20 = _a.sent();
                    console.error('Impossible to remove this record', error_20.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
//Companies TABLE
//Create Company 
function createCompany(company) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, values, result, error_21;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "\n        INSERT INTO Companies (company_name)\n        VALUES (?);\n        ";
                    values = [
                        company.company_name
                    ];
                    return [4 /*yield*/, db.run(query, values)];
                case 2:
                    result = _a.sent();
                    console.log('Company added successfully');
                    return [2 /*return*/, result.lastID];
                case 3:
                    error_21 = _a.sent();
                    if (error_21.message.includes('UNIQUE constraint failed')) {
                        console.error('The company name already exists');
                    }
                    else {
                        console.error('Impossible to add this company', error_21.message);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
//Read all companies
function getAllCompanies() {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, companies, error_22;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "\n        SELECT * FROM Companies ORDER BY company_name ASC;\n        ";
                    return [4 /*yield*/, db.all(query)];
                case 2:
                    companies = _a.sent();
                    return [2 /*return*/, companies];
                case 3:
                    error_22 = _a.sent();
                    console.error('Impossible to read all companies', error_22.message);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//Read company By ID
function getCompanyByID(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, company, error_23;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    query = "\n        Select * FROM Companies WHERE Id = ?;\n        ";
                    return [4 /*yield*/, db.get(query, id)];
                case 2:
                    company = _a.sent();
                    if (!company) {
                        console.error("Company with id: ".concat(id, " not found"));
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, company];
                case 3:
                    error_23 = _a.sent();
                    console.error('Impossible to find this review', error_23.message);
                    throw new Error('Could not fetch the company. Please try again later.');
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
//Update CompanyByID
function updateCompanyByID(id, updates) {
    return __awaiter(this, void 0, void 0, function () {
        var db, companyExist, fields, values, query, result, error_24;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    if (Object.keys(updates).length === 0) {
                        throw new Error('No fields to update');
                    }
                    return [4 /*yield*/, db.get("SELECT 1 FROM Companies WHERE id = ?;", id)];
                case 2:
                    companyExist = _a.sent();
                    if (!companyExist) {
                        throw new Error("Company with ID ".concat(id, " does not exist"));
                    }
                    fields = Object.keys(updates)
                        .map(function (key) { return "".concat(key, " = ?"); })
                        .join(', ');
                    values = __spreadArray(__spreadArray([], Object.values(updates), true), [id], false);
                    query = "UPDATE Companies SET ".concat(fields, " WHERE id = ?;");
                    return [4 /*yield*/, db.run(query, values)];
                case 3:
                    result = _a.sent();
                    if (result.changes === 0) {
                        throw new Error("No changes maded to the company with ID ".concat(id));
                    }
                    console.log("Company with ID ".concat(id, " Updated successfully"));
                    return [2 /*return*/, result.changes];
                case 4:
                    error_24 = _a.sent();
                    console.error('Error updating the Company', error_24.message);
                    throw new Error('Failed to update the company. Please try again');
                case 5: return [2 /*return*/];
            }
        });
    });
}
;
//REMOVE COMPANY
function deleteCompanyByID(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, companyExist, query, result, error_25;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.get("SELECT 1 FROM Companies WHERE id = ?;", id)];
                case 2:
                    companyExist = _a.sent();
                    if (!companyExist) {
                        throw new Error("Company with ID ".concat(id, " does not exist"));
                    }
                    query = "DELETE FROM Companies WHERE id = ?";
                    return [4 /*yield*/, db.run(query, id)];
                case 3:
                    result = _a.sent();
                    if (result.changes === 0) {
                        throw new Error("Failed to delete company with ID ".concat(id, ". No changes were made."));
                    }
                    console.log("Record with id of ".concat(id, " removed successfully"));
                    return [2 /*return*/, result.changes];
                case 4:
                    error_25 = _a.sent();
                    console.error('Impossible to remove this record', error_25.message);
                    throw new Error('Impossible to remove this company. Please try again');
                case 5: return [2 /*return*/];
            }
        });
    });
}
;
/*********************************
    JOIN TABLES
********************************/
//VideogamesPlataforms Table
//Add a videogame to a platform
function addVideogameToPlataform(videogameId, plataformsId) {
    return __awaiter(this, void 0, void 0, function () {
        var db, error_26;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, db.run("INSERT INTO VideogamesPlataforms (videogame_id, plataform_id) VALUES (?,?)", [videogameId, plataformsId])];
                case 3:
                    _a.sent();
                    console.log("Videogame ".concat(videogameId, " successfully linked to ").concat(plataformsId));
                    return [3 /*break*/, 5];
                case 4:
                    error_26 = _a.sent();
                    console.error('Error linking videogame to the plataform', error_26.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
;
//Get All platforms associated with one game
function getPlataformsForVideogames(videogameId) {
    return __awaiter(this, void 0, void 0, function () {
        var db, plataforms;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    try {
                        plataforms = db.all("SELECT plataform_name * FROM Plataforms\n             INNER JOIN VideogamesPlataforms ON Plataform.id = VideogamesPlataforms.plataformsId\n             WHERE VideogamePlataform.videogameId = ?'\n            ", [videogameId]);
                        return [2 /*return*/, plataforms];
                    }
                    catch (error) {
                        console.error('ERROR Fetching plataforms for a videogame', error.message);
                        return [2 /*return*/, []];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
;
// Get All Videogames associated with one platform
function getVideoGamesForPlataforms(plataformId) {
    return __awaiter(this, void 0, void 0, function () {
        var db, videogames, error_27;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, db.all("SELECT gameName * FROM Videogame\n             INNER JOIN VideogamesPlataforms ON Videogame.id = VideogamesPlataforms.videogameId\n             WHERE VideogamesPlataforms.plataformId = ?\n            ", [plataformId])];
                case 3:
                    videogames = _a.sent();
                    return [2 /*return*/, videogames];
                case 4:
                    error_27 = _a.sent();
                    console.error('ERROR fetching Videogames for PLataforms', error_27.message);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//Delete relations from a videogame to a platform
function RemoveVideogameFromPlatForm(videogamesId, platformId) {
    return __awaiter(this, void 0, void 0, function () {
        var db, error_28;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, db.run("DELETE FROM VideogamesPlataforms WHERE videogameId = ? AND plataformsId = ?", [videogamesId, platformId])];
                case 3:
                    _a.sent();
                    console.log("Videogame ".concat(videogamesId, " successfully unlinked to ").concat(platformId));
                    return [3 /*break*/, 5];
                case 4:
                    error_28 = _a.sent();
                    console.error('Error unlinking videogame from platform', error_28.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//User_Favorites Table 
function addUserFavorites(userId, videogameId) {
    return __awaiter(this, void 0, void 0, function () {
        var db, error_29;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, db.run("INSERT INTO User_Favorites (User_id, Videogame_id) VALUES (?, ?)", [userId, videogameId])];
                case 3:
                    _a.sent();
                    console.log("User ".concat(userId, " added this videogame ").concat(videogameId, " to favorites list"));
                    return [3 /*break*/, 5];
                case 4:
                    error_29 = _a.sent();
                    console.error('Error adding this videogame to favorite list please try again later', error_29.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//READ all favorites game for user
function getAllFavoritesForUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var db, favorites, error_30;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, db.run("SELECT Videogame. * FROM Videogames\n             INNER JOIN User_Favorites ON Videogame.id = User_Favorites.Videogame_id\n             WHERE User_Favorites.User_id = ?\n            ", [userId])];
                case 3:
                    favorites = _a.sent();
                    return [2 /*return*/, favorites];
                case 4:
                    error_30 = _a.sent();
                    console.error('Error reading the favorites for user', error_30.message);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//DELETE a game from favorites
function removeUserFavorite(userId, videogameId) {
    return __awaiter(this, void 0, void 0, function () {
        var db, error_31;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, db.run("\n            DELETE FROM User_Favorites WHERE User_id = ? AND Videogame_id = ?\n            ", [userId, videogameId])];
                case 3:
                    _a.sent();
                    console.log("Videogame ".concat(videogameId, " successfully removed from user ").concat(userId, "'s favorites"));
                    return [3 /*break*/, 5];
                case 4:
                    error_31 = _a.sent();
                    console.error('Error removing videogame from user favorites list', error_31.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//VIDEOGAMESGENRE TABLE
// Add genre to a videogame
function AddGenreToVideogame(videogameId, genreId) {
    return __awaiter(this, void 0, void 0, function () {
        var db, error_32;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, db.run("\n            INSERT INTO VideogamesGenre (videogameId, genresId) VALUES (?, ?)\n            ", [videogameId, genreId])];
                case 3:
                    _a.sent();
                    console.log("Added genre ".concat(genreId, " to ").concat(videogameId));
                    return [3 /*break*/, 5];
                case 4:
                    error_32 = _a.sent();
                    console.error('Error adding the genre to this videogame', error_32.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//Delete genre from vdeogame
function removeVideogameGenre(videogameId, genreId) {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    try {
                        db.run("\n            DELETE FROM VideogamesGenre WHERE videogameId = ? AND genreId = ?\n            ", [videogameId, genreId]);
                        console.log("Removed Genre ".concat(genreId, " from ").concat(videogameId));
                    }
                    catch (error) {
                        console.error('Error removing genre from videogame', error.message);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//Select Genres for videogame
function getGenresForVideogame(videogameId) {
    return __awaiter(this, void 0, void 0, function () {
        var db, genres;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.default];
                case 1:
                    db = _a.sent();
                    try {
                        genres = db.run("\n            SELECT Genre.* FROM Genres\n            INNER JOIN VideogamesGenre ON Genres.id = VideogamesGenre.genresId\n            WHERE VideogamesGenre.videogameId = ?\n            ", [videogameId]);
                        return [2 /*return*/, genres];
                    }
                    catch (error) {
                        console.error('Error selecting genres for videogame', error.message);
                        return [2 /*return*/, []];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
