"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneCategory = exports.getAllCategory = exports.createCat = void 0;
const userModel_1 = __importDefault(require("../Model/userModel"));
const categoryModel_1 = __importDefault(require("../Model/categoryModel"));
const slugify_1 = __importDefault(require("slugify"));
function generateStudentId() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    const length = 6;
    let randomId = "";
    for (let i = 0; i < length; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
}
const createCat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, parent } = req.body;
        if (!name) {
            return res.status(401).json({
                success: 0,
                message: "name can't be empty",
            });
        }
        const { userId } = req.params;
        console.log(userId);
        const getUser = yield userModel_1.default.findOne({ _id: userId });
        console.log(getUser);
        const dataCat = yield categoryModel_1.default.create({
            name,
            parent,
            slug: `${(0, slugify_1.default)(name)}-${generateStudentId()}`,
        });
        dataCat.user = getUser;
        dataCat.save();
        return res.status(201).json({
            message: dataCat,
        });
        // return res.status(201).json({
        //     message: "posted"
        // })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.message,
        });
    }
});
exports.createCat = createCat;
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryModel_1.default.find();
        console.log(category);
        return res.status(200).json({
            message: "all category",
            success: 1,
            result: category,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.message,
        });
    }
});
exports.getAllCategory = getAllCategory;
const getOneCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getCategory = yield categoryModel_1.default.findById(req.params.catId);
        return res.status(200).json({
            message: "successfully",
            data: getCategory
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.getOneCategory = getOneCategory;
// export const deleteCat = async (req:)
