import express from "express"
import { RemoveFromCart, addToCart } from "../Controller/cartController";
import { verifyToken } from "../Utils/verify";

const router = express.Router();

router.route("/create-cart/:userId/:productId").post(verifyToken, addToCart)
router.route("/:userId").post(RemoveFromCart)

export default router;