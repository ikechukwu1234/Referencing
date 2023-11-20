"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../Uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueStuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.originalname);
    }
});
//  const upload = multer({storage: storage}).single("avatar")
const upload = (0, multer_1.default)({ storage: storage }).single("img");
const avatarstorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../Uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueStuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.originalname);
    }
});
//  const upload = multer({storage: storage}).single("avatar")
exports.default = upload;
