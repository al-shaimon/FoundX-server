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
exports.Item = void 0;
const mongoose_1 = require("mongoose");
const itemCategory_model_1 = require("../ItemCategory/itemCategory.model");
const item_constant_1 = require("./item.constant");
const itemSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        default: [],
    },
    location: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        enum: item_constant_1.DISTRICTS,
        required: true,
    },
    dateFound: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: Object.keys(item_constant_1.ITEM_STATUS),
        required: true,
    },
    isReported: {
        type: Boolean,
        default: false,
    },
    reportCount: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ItemCategory',
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questions: {
        type: [String],
        default: [],
    },
    claimRequests: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'ClaimRequest',
        default: [],
        select: 0,
    },
}, {
    timestamps: true,
    virtuals: true,
});
// Middleware to increment item count in associated category
itemSchema.post('save', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield itemCategory_model_1.ItemCategory.findByIdAndUpdate(doc.category, {
                $inc: { postCount: 1 },
            });
        }
        catch (error) {
            throw new Error(`Failed to increment item count for category ${doc.category}: ${error}`);
        }
    });
});
exports.Item = (0, mongoose_1.model)('Item', itemSchema);
