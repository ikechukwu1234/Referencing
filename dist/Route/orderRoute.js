"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../Controller/orderController");
const router = express_1.default.Router();
router.route("/order-checkout/:userId").post(orderController_1.checkOut);
exports.default = router;
