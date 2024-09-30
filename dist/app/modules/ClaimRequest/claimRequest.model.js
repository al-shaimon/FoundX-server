"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimRequest = void 0;
const mongoose_1 = require("mongoose");
const claimRequest_constant_1 = require("./claimRequest.constant");
const answerSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    virtuals: true,
    _id: false,
});
const claimRequestSchema = new mongoose_1.Schema({
    item: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    claimant: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: Object.keys(claimRequest_constant_1.CLAIM_REQUEST_STATUS),
        default: 'PENDING',
    },
    description: {
        type: String,
        required: true,
    },
    answers: {
        type: [answerSchema],
        default: [],
    },
    feedback: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
    virtuals: true,
});
exports.ClaimRequest = (0, mongoose_1.model)('ClaimRequest', claimRequestSchema);
