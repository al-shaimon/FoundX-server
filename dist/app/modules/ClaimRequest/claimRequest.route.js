"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimRequestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_constant_1 = require("../User/user.constant");
const claimRequest_controller_1 = require("./claimRequest.controller");
const claimRequest_validation_1 = require("./claimRequest.validation");
const router = express_1.default.Router();
router.get('/received-claim-request', (0, auth_1.default)(user_constant_1.USER_ROLE.USER), claimRequest_controller_1.ClaimRequestControllers.viewReceivedClaimRequests);
router.get('/my-claim-request', (0, auth_1.default)(user_constant_1.USER_ROLE.USER), claimRequest_controller_1.ClaimRequestControllers.viewMyClaimRequests);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.USER), claimRequest_controller_1.ClaimRequestControllers.getClaimRequestById);
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.USER), (0, validateRequest_1.default)(claimRequest_validation_1.ClaimRequestValidation.createClaimRequestValidationSchema), claimRequest_controller_1.ClaimRequestControllers.createClaimRequest);
router.put('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.USER), (0, validateRequest_1.default)(claimRequest_validation_1.ClaimRequestValidation.updateClaimRequestStatusWithFeedbackSchema), claimRequest_controller_1.ClaimRequestControllers.updateStatusWithFeedback);
exports.ClaimRequestRoutes = router;
