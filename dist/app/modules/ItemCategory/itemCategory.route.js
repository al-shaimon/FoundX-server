"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const itemCategory_controller_1 = require("./itemCategory.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const itemCategory_validation_1 = require("./itemCategory.validation");
const router = express_1.default.Router();
router.get('/', itemCategory_controller_1.ItemCategoryControllers.getAllItemCategories);
router.get('/:id', itemCategory_controller_1.ItemCategoryControllers.getItemCategoryById);
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(itemCategory_validation_1.ItemCategoryValidation.createItemCategoryValidationSchema), itemCategory_controller_1.ItemCategoryControllers.createItemCategory);
router.put('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(itemCategory_validation_1.ItemCategoryValidation.updateItemCategoryValidationSchema), itemCategory_controller_1.ItemCategoryControllers.updateItemCategory);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), itemCategory_controller_1.ItemCategoryControllers.deleteItemCategory);
exports.ItemCategoryRoutes = router;
