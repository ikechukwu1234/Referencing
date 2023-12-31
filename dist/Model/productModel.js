"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const proSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    img: {
        type: String
    },
    price: {
        type: Number
    },
    desc: {
        type: String
    },
    Quantity: {
        type: Number
    },
    category: {
        type: String
    },
    createdby: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("products", proSchema);
