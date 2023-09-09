"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.fileExistsInThumbs = exports.fileExistsInFull = exports.middleware = void 0;
var fileUtils_1 = require("./fileUtils");
Object.defineProperty(exports, "fileExistsInThumbs", { enumerable: true, get: function () { return fileUtils_1.fileExistsInThumbs; } });
Object.defineProperty(exports, "fileExistsInFull", { enumerable: true, get: function () { return fileUtils_1.fileExistsInFull; } });
var fs = require('fs/promises');
var path = require('path');
var sharp = require("sharp");
var NoFilenameError = /** @class */ (function (_super) {
    __extends(NoFilenameError, _super);
    function NoFilenameError() {
        var _this = _super.call(this, 'No Filename given') || this;
        _this.name = 'NoFilenameError';
        return _this;
    }
    return NoFilenameError;
}(Error));
var NoFileExistsError = /** @class */ (function (_super) {
    __extends(NoFileExistsError, _super);
    function NoFileExistsError() {
        var _this = _super.call(this, 'No File Exists') || this;
        _this.name = 'NoFileExistsError';
        return _this;
    }
    return NoFileExistsError;
}(Error));
// Get all params and checks if image already in thumbs folder if yes then serve image from local storage
// otherwise resize an image and save it to local storage (default 200 x 200)
var middleware = {
    readParams: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var filename, width, height, defaultWidth, defaultHeight, filepath, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        filename = req.query.filename;
                        width = req.query.width;
                        height = req.query.height;
                        defaultWidth = '200';
                        defaultHeight = '200';
                        if (!filename) {
                            throw new NoFilenameError();
                        }
                        req.filename = filename;
                        req.width = width || defaultWidth;
                        req.height = height || defaultHeight;
                        filepath = path.join(__dirname, '../../public/assets/img/full', req.filename + '.jpg');
                        req.filepath = filepath;
                        return [4 /*yield*/, (0, fileUtils_1.fileExistsInThumbs)(req.filename, req.width, req.height)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 2];
                        this.sendImage(req, res, next);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, (0, fileUtils_1.fileExistsInFull)(req.filename)];
                    case 3:
                        if (_a.sent()) {
                            next();
                        }
                        else {
                            throw new NoFileExistsError();
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        if (err_1.name === 'NoFilenameError') {
                            res.status(404).send('No filename');
                            return [2 /*return*/];
                        }
                        else if (err_1.name === 'NoFileExistsError') {
                            res.status(404).send('File doesnt Exist');
                            return [2 /*return*/];
                        }
                        console.log(err_1);
                        return [2 /*return*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    resizeImage: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, sharp(req.filepath)
                                .resize({
                                width: parseInt(req.width),
                                height: parseInt(req.height)
                            })
                                .toFile("public/assets/img/thumbs/".concat(req.filename) + "".concat(req.width) + 'x' + "".concat(req.height) + '_thumbs.jpg')];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log("Error in resize Image:" + error_1);
                        res.status(404).send('Failed to resize image');
                        return [2 /*return*/];
                    case 3:
                        next();
                        return [2 /*return*/];
                }
            });
        });
    },
    sendImage: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req;
                        return [4 /*yield*/, fs.readFile(path.join(__dirname, '../../public/assets/img/thumbs', req.filename + "".concat(req.width) + 'x' + "".concat(req.height) + '_thumbs.jpg'))];
                    case 1:
                        _a.data = _b.sent();
                        res.setHeader('Content-Type', 'image/jpeg');
                        res.status(200).end(req.data);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _b.sent();
                        console.log("Error in sendImage:" + err_2);
                        res.status(404).send('Failed to send image');
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
};
exports.middleware = middleware;
