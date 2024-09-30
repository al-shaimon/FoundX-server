"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/Auth/auth.route");
const user_route_1 = require("../modules/User/user.route");
const item_route_1 = require("../modules/Item/item.route");
const itemCategory_route_1 = require("../modules/ItemCategory/itemCategory.route");
const profile_route_1 = require("../modules/Profile/profile.route");
const claimRequest_route_1 = require("../modules/ClaimRequest/claimRequest.route");
const meilisearch_routes_1 = require("../modules/Meilisearch/meilisearch.routes");
const imageUpload_routes_1 = require("../modules/ImageUpload/imageUpload.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/item-categories',
        route: itemCategory_route_1.ItemCategoryRoutes,
    },
    {
        path: '/items',
        route: item_route_1.ItemRoutes,
    },
    {
        path: '/claim-request',
        route: claimRequest_route_1.ClaimRequestRoutes,
    },
    {
        path: '/search-items',
        route: meilisearch_routes_1.MeilisearchRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/profile',
        route: profile_route_1.ProfileRoutes,
    },
    {
        path: "/image-upload",
        route: imageUpload_routes_1.ImageUploadRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
