"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../Utils/multer"));
const profileController_1 = require("../Controller/profileController");
const router = express_1.default.Router();
router.route("/edit/pro/:ProfileId").put(profileController_1.editProfile);
router.route("/edit/image/:ProfileId").put(multer_1.default, profileController_1.editImage);
router.route("/get/profile").get(profileController_1.getAllProfile);
router.route("/get-one/:ProfileId").get(profileController_1.getSingleProfile);
router.route("/delete/profile/:ProfileId").delete(profileController_1.DeleteProfile);
exports.default = router;
