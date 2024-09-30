"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemValidation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const item_constant_1 = require("./item.constant");
const createItemValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        image: zod_1.z.string().optional(),
        location: zod_1.z.string({
            required_error: 'Location is required',
        }),
        city: zod_1.z.enum(item_constant_1.DISTRICTS, {
            required_error: 'City is required',
        }),
        dateFound: zod_1.z.string({ message: 'Date found is required' }).refine((val) => {
            return new Date(val).toString() !== 'Invalid Date';
        }),
        status: zod_1.z.nativeEnum(item_constant_1.ITEM_STATUS).default(item_constant_1.ITEM_STATUS.AVAILABLE),
        isReported: zod_1.z.boolean().optional(),
        reportCount: zod_1.z.number().optional(),
        user: zod_1.z
            .string({
            required_error: 'User is required',
        })
            .refine((val) => {
            return mongoose_1.default.Types.ObjectId.isValid(val);
        }),
        category: zod_1.z
            .string({
            required_error: 'Category is required',
        })
            .refine((val) => {
            return mongoose_1.default.Types.ObjectId.isValid(val);
        }),
        questions: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
const updateItemValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        city: zod_1.z.enum(item_constant_1.DISTRICTS).optional(),
        dateFound: zod_1.z.date().optional(),
        status: zod_1.z.nativeEnum(item_constant_1.ITEM_STATUS).optional(),
        isReported: zod_1.z.boolean().optional(),
        reportCount: zod_1.z.number().optional(),
        user: zod_1.z
            .string()
            .refine((val) => {
            return mongoose_1.default.Types.ObjectId.isValid(val);
        })
            .optional(),
        category: zod_1.z
            .string()
            .refine((val) => {
            return mongoose_1.default.Types.ObjectId.isValid(val);
        })
            .optional(),
        questions: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.ItemValidation = {
    createItemValidationSchema,
    updateItemValidationSchema,
};
