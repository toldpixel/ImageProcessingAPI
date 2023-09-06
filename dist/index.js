"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageMiddleware_1 = __importDefault(require("./util/imageMiddleware"));
var fs = require('fs/promises');
var app = (0, express_1.default)();
var port = 3000;
var fileName;
app.get('/api/images', function (req, res, next) {
    fileName = req.query.filename || 'empty';
    var width = req.query.width || 'empty';
    ;
    var height = req.query.height || 'empty';
    ;
    console.log(fileName + "" + width + height);
    next();
});
app.use(function (req, res, next) {
    (0, imageMiddleware_1.default)(req, res, next, fileName);
});
app.listen(port, function () {
    console.log("server started at http://localhost:".concat(port));
});
exports.default = app;
