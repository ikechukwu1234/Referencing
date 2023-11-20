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
exports.DeleteProfile = exports.getSingleProfile = exports.getAllProfile = exports.editImage = exports.editProfile = void 0;
const profileModel_1 = __importDefault(require("../Model/profileModel"));
const cloudinary_1 = __importDefault(require("../Utils/cloudinary"));
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, gender, phoneNumber, dateOfBirth } = req.body;
        const { ProfileId } = req.params;
        const getUpdate = yield profileModel_1.default.findByIdAndUpdate(ProfileId, {
            firstName,
            lastName,
            gender,
            phoneNumber,
            dateOfBirth
        }, {
            new: true
        });
        return res.status(201).json({
            message: "updated successfully",
            data: getUpdate
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to update profile",
            error: error.message
        });
    }
});
exports.editProfile = editProfile;
const editImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ProfileId } = req.params;
        console.log(req.file);
        const imageurl = yield cloudinary_1.default.uploader.upload(req.file.path);
        console.log("k10xlkjh", imageurl);
        const updateImage = yield profileModel_1.default.findByIdAndUpdate(ProfileId, {
            avatar: imageurl.secure_url
        }, { new: true });
        return res.status(201).json({
            message: "image updated successfully"
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.editImage = editImage;
const getAllProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getProfile = yield profileModel_1.default.find();
        return res.status(200).json({
            message: "all profile on board",
            result: getProfile
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "error to get all",
            error: error.message
        });
    }
});
exports.getAllProfile = getAllProfile;
const getSingleProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ProfileId } = req.params;
        const getSingle = yield profileModel_1.default.findById(ProfileId);
        return res.status(200).json({
            message: "view single user",
            data: getSingle
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.getSingleProfile = getSingleProfile;
const DeleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ProfileId } = req.params;
        const Delete = yield profileModel_1.default.findByIdAndDelete(ProfileId);
        return res.status(200).json({
            message: "profile deleted successfuly",
            data: Delete
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.DeleteProfile = DeleteProfile;
