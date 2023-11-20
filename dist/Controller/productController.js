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
exports.DeleteProduct = exports.ViewAllProduct = exports.getSingleProduct = exports.createProduct = void 0;
const userModel_1 = __importDefault(require("../Model/userModel"));
const categoryModel_1 = __importDefault(require("../Model/categoryModel"));
const cloudinary_1 = __importDefault(require("../Utils/cloudinary"));
const productModel_1 = __importDefault(require("../Model/productModel"));
const mongoose_1 = __importDefault(require("mongoose"));
//   import slugify from "slugify";
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, desc, price, qty, category } = req.body;
        console.log("asdflkjh", req.user._id);
        // if (!name || !desc || !price || !qty || !category)
        // return res.status(404).json({
        //   message: "enter all field"  
        // })
        const { catId } = req.params;
        console.log(catId);
        const getCat = yield categoryModel_1.default.findOne({ _id: catId });
        console.log(getCat);
        const { userId } = req.params;
        console.log(userId);
        const getUser = yield userModel_1.default.findOne({ _id: userId });
        console.log(getUser);
        const imageUrl = yield cloudinary_1.default.uploader.upload(req.file.path);
        console.log(imageUrl);
        if (req.user.role === "admin") {
            const dataProduct = yield productModel_1.default.create({
                name,
                desc,
                price,
                qty,
                category,
                img: "imahe.jpg"
            });
            getCat.products.push(new mongoose_1.default.Types.ObjectId(dataProduct._id));
            getCat.save();
            dataProduct.createdby = getUser;
            dataProduct.save();
            return res.status(201).json({
                success: 1,
                message: dataProduct
            });
        }
        else {
            return res.status(201).json({
                message: "only admin can post"
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.createProduct = createProduct;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ProfileId } = req.params;
        const fetchData = yield productModel_1.default.findById(ProfileId);
        return res.status(200).json({
            message: "single product available",
            data: fetchData
        });
    }
    catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});
exports.getSingleProduct = getSingleProduct;
const ViewAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ViewProduct = yield productModel_1.default.find();
        return res.status(200).json({
            message: "all product available",
            data: ViewProduct
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.mesaage
        });
    }
});
exports.ViewAllProduct = ViewAllProduct;
const DeleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ProductId } = req.params;
        const ProductDelete = yield productModel_1.default.findByIdAndDelete(ProductId);
        return res.status(200).json({
            message: "product deleted successfully",
            data: ProductDelete
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.DeleteProduct = DeleteProduct;
