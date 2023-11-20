"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenGenerator = (data) => {
    return jsonwebtoken_1.default.sign(data, "asdfghjkl", { expiresIn: "10ms" });
};
exports.tokenGenerator = tokenGenerator;
