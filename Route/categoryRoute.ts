import express from "express";
import upload from "../Utils/multer";
import { createCat, getAllCategory, getOneCategory } from "../Controller/categoryController";
import { verifyToken } from "../Utils/verify";

const router = express.Router();

router.route("/create-category/:userId").post(verifyToken, createCat);
router.route("/getall/category").get(getAllCategory);
router.route("/one/:catId").get(getOneCategory)

export default router;
