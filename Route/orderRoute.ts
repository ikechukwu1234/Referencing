import  express from "express"
import { checkOut } from "../Controller/orderController"


const router = express.Router()
router.route("/order-checkout/:userId").post(checkOut)

export default router