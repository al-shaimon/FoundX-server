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
exports.ItemCategoryServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const itemCategory_constant_1 = require("./itemCategory.constant");
const itemCategory_model_1 = require("./itemCategory.model");
const createItemCategory = (itemCategory) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield itemCategory_model_1.ItemCategory.create(itemCategory);
    return result;
});
const getAllItemCategories = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const items = new QueryBuilder_1.QueryBuilder(itemCategory_model_1.ItemCategory.find({ isDeleted: false }), query)
        .search(itemCategory_constant_1.itemCategorySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield items.modelQuery;
    return result;
});
const getItemCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const isCategoryExists = yield itemCategory_model_1.ItemCategory.findOne({
        _id: categoryId,
        isDeleted: false,
    });
    if (!isCategoryExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Item Category not found!');
    }
    const category = yield itemCategory_model_1.ItemCategory.findOne({
        _id: categoryId,
        isDeleted: false,
    }).exec();
    return category;
});
const updateItemCategory = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const isCategoryExists = yield itemCategory_model_1.ItemCategory.findOne({
        _id: id,
        isDeleted: false,
    });
    if (!isCategoryExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Item Category not found!');
    }
    const category = yield itemCategory_model_1.ItemCategory.findByIdAndUpdate(id, updateData, {
        new: true,
    });
    return category;
});
const deleteItemCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isCategoryExists = yield itemCategory_model_1.ItemCategory.findOne({
        _id: id,
        isDeleted: false,
    });
    if (!isCategoryExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Item Category not found!');
    }
    const category = yield itemCategory_model_1.ItemCategory.findByIdAndDelete(id);
    return category;
});
exports.ItemCategoryServices = {
    createItemCategory,
    getAllItemCategories,
    getItemCategoryById,
    updateItemCategory,
    deleteItemCategory,
};
