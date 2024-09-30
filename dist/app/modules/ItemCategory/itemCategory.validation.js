"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCategoryValidation = void 0;
const zod_1 = require("zod");
const createItemCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
    }),
});
const updateItemCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
    }),
});
exports.ItemCategoryValidation = {
    createItemCategoryValidationSchema,
    updateItemCategoryValidationSchema,
};
