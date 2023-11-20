"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const url = "mongodb://0.0.0.0:27017/workingonreference";
const onLine = "mongodb+srv://ikechukwuumezurike465:g7zOJkdyv3G91pJI@cluster0.q7n6gqu.mongodb.net/ecommerce";
mongoose_1.default.connect(onLine).then(() => {
    console.log("database connected successfully");
}).catch((error) => {
    console.log("an error occurred", error);
});
exports.default = mongoose_1.default;
