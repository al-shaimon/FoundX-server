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
exports.ClaimRequestServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const emailSender_1 = require("../../utils/emailSender");
const item_model_1 = require("../Item/item.model");
const claimRequest_constant_1 = require("./claimRequest.constant");
const claimRequest_model_1 = require("./claimRequest.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createClaimRequest = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const item = yield item_model_1.Item.findById(payload.item).session(session);
        if (!item) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Item not found!');
        }
        if (item.user.toString() === user._id) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Since you found the item, you are not able to claim it');
        }
        const isClaimRequestExists = yield claimRequest_model_1.ClaimRequest.findOne({
            item: item._id,
            claimant: user._id,
        }).session(session); // Query with session
        if (isClaimRequestExists) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'You have already created a claim request!');
        }
        let questionAnswers = [];
        if ((_a = item.questions) === null || _a === void 0 ? void 0 : _a.length) {
            questionAnswers = item.questions.map((question, index) => {
                var _a;
                return {
                    question: question,
                    answer: ((_a = payload.answers) === null || _a === void 0 ? void 0 : _a.length)
                        ? payload.answers[index]
                        : '',
                };
            });
        }
        const claimRequest = yield claimRequest_model_1.ClaimRequest.create([
            {
                item: payload.item,
                claimant: user._id,
                description: payload.description,
                answers: questionAnswers,
            },
        ], { session });
        yield item_model_1.Item.findByIdAndUpdate(item._id, {
            $push: { claimRequests: claimRequest[0]._id },
        }, { session });
        yield session.commitTransaction();
        session.endSession();
        return claimRequest;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const viewReceivedClaimRequests = (query, user) => __awaiter(void 0, void 0, void 0, function* () {
    const items = new QueryBuilder_1.QueryBuilder(item_model_1.Item.find({
        user: user._id,
        claimRequests: { $exists: true, $not: { $size: 0 } },
    }).populate({
        path: 'claimRequests',
        populate: {
            path: 'claimant',
        },
    }), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    if (!items) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No item found!');
    }
    const result = yield items.modelQuery;
    return result;
});
const viewMyClaimRequests = (query, user) => __awaiter(void 0, void 0, void 0, function* () {
    // user._id = "64ecf4f2b95e9b54a5c9e5f9"
    const itemQuery = new QueryBuilder_1.QueryBuilder(claimRequest_model_1.ClaimRequest.find({ claimant: user._id }).populate('item'), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield itemQuery.modelQuery;
    return result;
});
const getClaimRequestById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield claimRequest_model_1.ClaimRequest.findById(id)
        .populate('item')
        .populate('claimant');
    return result;
});
const updateStatusWithFeedback = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const claimRequest = yield claimRequest_model_1.ClaimRequest.findById(id).populate('item');
    if (!claimRequest) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Claim request not found!');
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if ((claimRequest === null || claimRequest === void 0 ? void 0 : claimRequest.item.user) != user._id) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'You have no permission to update!');
    }
    const result = yield claimRequest_model_1.ClaimRequest.findByIdAndUpdate(id, payload, {
        new: true,
    })
        .populate('item')
        .populate('claimant');
    const populatedItem = result === null || result === void 0 ? void 0 : result.item;
    const populatedClaimant = result === null || result === void 0 ? void 0 : result.claimant;
    const emailData = {
        recipient_name: populatedClaimant.name,
        item_name: populatedItem.title,
        feedback: result === null || result === void 0 ? void 0 : result.feedback,
        isApproved: (result === null || result === void 0 ? void 0 : result.status) === claimRequest_constant_1.CLAIM_REQUEST_STATUS.APPROVED,
    };
    const emailTemplate = yield emailSender_1.EmailHelper.createEmailContent(emailData, 'claimNotification');
    yield emailSender_1.EmailHelper.sendEmail(populatedClaimant.email, emailTemplate, `Your claim request is ${result === null || result === void 0 ? void 0 : result.status}!`);
    return result;
});
exports.ClaimRequestServices = {
    createClaimRequest,
    viewReceivedClaimRequests,
    viewMyClaimRequests,
    getClaimRequestById,
    updateStatusWithFeedback,
};
