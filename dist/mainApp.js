"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./Route/userRoute"));
const profileRoute_1 = __importDefault(require("./Route/profileRoute"));
const categoryRoute_1 = __importDefault(require("./Route/categoryRoute"));
const productRoute_1 = __importDefault(require("./Route/productRoute"));
const cartRoute_1 = __importDefault(require("./Route/cartRoute"));
const orderRoute_1 = __importDefault(require("./Route/orderRoute"));
const mainApp = (app) => {
    app.use((0, cors_1.default)()).use(express_1.default.json())
        .use("/api/v1", userRoute_1.default)
        .use("/api/v1", profileRoute_1.default)
        .use("/api/v1", categoryRoute_1.default)
        .use("/api/v1", productRoute_1.default)
        .use("/api/v1", cartRoute_1.default)
        .use("/api/v1", orderRoute_1.default)
        .get("/page/data", (req, res) => {
        const id = req.params.id;
        const userName = "Tosin";
        res.render("VerifyAccount", { userName, id });
    })
        .get("/api/v1", (req, res) => {
        res.status(200).json({
            message: "api is ready"
        });
    });
};
exports.mainApp = mainApp;
