"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../Controller/categoryController");
const verify_1 = require("../Utils/verify");
const router = express_1.default.Router();
router.route("/create-category/:userId").post(verify_1.verifyToken, categoryController_1.createCat);
router.route("/getall/category").get(categoryController_1.getAllCategory);
router.route("/one/:catId").get(categoryController_1.getOneCategory);
exports.default = router;
