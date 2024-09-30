"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCategory = void 0;
const mongoose_1 = require("mongoose");
// Define the schema
const ItemCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    postCount: {
        type: Number,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.ItemCategory = (0, mongoose_1.model)('ItemCategory', ItemCategorySchema);
