"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimRequestValidation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const claimRequest_constant_1 = require("./claimRequest.constant");
const createClaimRequestValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        item: zod_1.z
            .string({
            required_error: 'Item is required',
        })
            .refine((val) => {
            return mongoose_1.default.Types.ObjectId.isValid(val);
        }),
        answers: zod_1.z.array(zod_1.z.string({
            required_error: 'Answer is required',
        })),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        status: zod_1.z
            .nativeEnum(claimRequest_constant_1.CLAIM_REQUEST_STATUS)
            .default(claimRequest_constant_1.CLAIM_REQUEST_STATUS.PENDING),
    }),
});
const updateClaimRequestValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        description: zod_1.z
            .string({
            required_error: 'Description is required',
        })
            .optional(),
        status: zod_1.z.nativeEnum(claimRequest_constant_1.CLAIM_REQUEST_STATUS).optional(),
        answers: zod_1.z
            .array(zod_1.z.object({
            user: zod_1.z
                .string({
                required_error: 'User is required',
            })
                .refine((val) => {
                return mongoose_1.default.Types.ObjectId.isValid(val);
            }),
            question: zod_1.z.string({
                required_error: 'Question is required',
            }),
            answer: zod_1.z.string({
                required_error: 'Answer is required',
            }),
        }))
            .optional(),
    }),
});
const updateClaimRequestStatusWithFeedbackSchema = zod_1.z.object({
    body: zod_1.z.object({
        feedback: zod_1.z
            .string({
            required_error: 'Feedback is required',
        })
            .optional(),
        status: zod_1.z.nativeEnum(claimRequest_constant_1.CLAIM_REQUEST_STATUS)
    }),
});
exports.ClaimRequestValidation = {
    createClaimRequestValidationSchema,
    updateClaimRequestValidationSchema,
    updateClaimRequestStatusWithFeedbackSchema
};
