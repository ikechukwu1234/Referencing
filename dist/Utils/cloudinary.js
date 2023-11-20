"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
cloudinary.config({
    cloud_name: "di7fvfnr8",
    api_key: "926349268892957",
    api_secret: "XbWlabxMPkLJG0otaK4Fei7DAGE"
});
exports.default = cloudinary;
