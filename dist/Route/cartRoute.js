"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../Controller/cartController");
const verify_1 = require("../Utils/verify");
const router = express_1.default.Router();
router.route("/create-cart/:userId/:productId").post(verify_1.verifyToken, cartController_1.addToCart);
router.route("/:userId").post(cartController_1.RemoveFromCart);
exports.default = router;
