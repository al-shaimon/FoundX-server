"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("./app/config"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const meilisearch_1 = require("./app/utils/meilisearch");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: [config_1.default.client_url],
}));
app.use((0, cookie_parser_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', routes_1.default);
//! THIS IS ONLY FOR DEVELOPMENT
//! DO NOT UNCOMMENT THIS IF YOU ARE NOT SURE WHAT YOU ARE DOING
//! DELETING ALL INDEX OF MEILISEARCH
meilisearch_1.meiliClient.index('item').deleteAllDocuments();
//Testing
app.get('/', (req, res, next) => {
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Welcome to the Lost And Found API',
    });
});
//global error handler
app.use(globalErrorHandler_1.default);
//handle not found
app.use(notFound_1.default);
exports.default = app;
