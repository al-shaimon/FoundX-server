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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCategoryControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const itemCategory_service_1 = require("./itemCategory.service");
const createItemCategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemCategory = yield itemCategory_service_1.ItemCategoryServices.createItemCategory(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Item Category Created Successfully',
        data: itemCategory,
    });
}));
const getAllItemCategories = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemCategory = yield itemCategory_service_1.ItemCategoryServices.getAllItemCategories(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Item Category Retrieved Successfully',
        data: itemCategory,
    });
}));
const getItemCategoryById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const itemCategory = yield itemCategory_service_1.ItemCategoryServices.getItemCategoryById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Item Category Retrieved Successfully',
        data: itemCategory,
    });
}));
const updateItemCategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const itemCategory = yield itemCategory_service_1.ItemCategoryServices.updateItemCategory(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Item Category updated successfully',
        data: itemCategory,
    });
}));
const deleteItemCategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const itemCategory = yield itemCategory_service_1.ItemCategoryServices.deleteItemCategory(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Item Category Deleted Successfully',
        data: itemCategory,
    });
}));
exports.ItemCategoryControllers = {
    createItemCategory,
    getAllItemCategories,
    getItemCategoryById,
    updateItemCategory,
    deleteItemCategory,
};
