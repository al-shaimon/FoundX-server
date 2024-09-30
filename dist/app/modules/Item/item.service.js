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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemServices = void 0;
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const meilisearch_1 = require("../../utils/meilisearch");
const item_constant_1 = require("./item.constant");
const item_model_1 = require("./item.model");
const item_utils_1 = require("./item.utils");
const createItemIntoDB = (payload, images) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemImages } = images;
    payload.images = itemImages.map((image) => image.path);
    const result = yield item_model_1.Item.create(payload);
    yield (0, meilisearch_1.addDocumentToIndex)(result, 'items');
    return result;
});
const getAllItemsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    query = (yield (0, item_utils_1.SearchItemByUserQueryMaker)(query)) || query;
    // Date range search
    query = (yield (0, item_utils_1.SearchItemByDateRangeQueryMaker)(query)) || query;
    query = (yield (0, item_utils_1.SearchItemByCategoryQueryMaker)(query)) || query;
    const itemQuery = new QueryBuilder_1.QueryBuilder(item_model_1.Item.find().populate('user').populate('category'), query)
        .filter()
        .search(item_constant_1.ItemsSearchableFields)
        .sort()
        // .paginate()
        .fields();
    const result = yield itemQuery.modelQuery;
    return result;
});
const getItemFromDB = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield item_model_1.Item.findById(itemId)
        .populate('user')
        .populate('category');
    return result;
});
const updateItemInDB = (itemId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield item_model_1.Item.findByIdAndUpdate(itemId, payload, { new: true });
    if (result) {
        yield (0, meilisearch_1.addDocumentToIndex)(result, 'items');
    }
    else {
        throw new Error(`Item with ID ${itemId} not found.`);
    }
    return result;
});
const deleteItemFromDB = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield item_model_1.Item.findByIdAndDelete(itemId);
    const deletedItemId = result === null || result === void 0 ? void 0 : result._id;
    if (deletedItemId) {
        yield (0, meilisearch_1.deleteDocumentFromIndex)('items', deletedItemId.toString());
    }
    return result;
});
exports.ItemServices = {
    createItemIntoDB,
    getAllItemsFromDB,
    getItemFromDB,
    updateItemInDB,
    deleteItemFromDB,
};
