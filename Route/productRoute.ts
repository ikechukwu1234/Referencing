import express from "express"
import { verifyToken } from "../Utils/verify"

const router = express.Router()

import { DeleteProduct, ViewAllProduct, createProduct, getSingleProduct } from "../Controller/productController"
import upload from "../Utils/multer"

router.route("/create-product/:userId/:catId").post(verifyToken, createProduct)
router.route("/single-product/:ProfileId").get(getSingleProduct)
router.route("/delete-product/:ProductId").delete(DeleteProduct)
router.route("/get-all/product").get(ViewAllProduct)



export default router