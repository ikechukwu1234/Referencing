"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verify_1 = require("../Utils/verify");
const router = express_1.default.Router();
const productController_1 = require("../Controller/productController");
router.route("/create-product/:userId/:catId").post(verify_1.verifyToken, productController_1.createProduct);
router.route("/single-product/:ProfileId").get(productController_1.getSingleProduct);
router.route("/delete-product/:ProductId").delete(productController_1.DeleteProduct);
router.route("/get-all/product").get(productController_1.ViewAllProduct);
exports.default = router;
