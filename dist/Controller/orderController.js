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
exports.checkOut = void 0;
const cartModel_1 = __importDefault(require("../Model/cartModel"));
const uuid_1 = require("uuid");
const flutterwave_node_v3_1 = __importDefault(require("flutterwave-node-v3"));
const flw = new flutterwave_node_v3_1.default("FLWFLWPUBK_TEST-3355c8d953d7e3b8472df89a9a505cb9-X", "FLWSECK_TEST-173a199b3d8796bb42b363f1ae3f30d6-X");
const checkOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const finduserCart = yield cartModel_1.default.findOne({ user: userId });
        console.log(finduserCart === null || finduserCart === void 0 ? void 0 : finduserCart.bill);
        const { card_number, cvv, expiry_month, expiry_year, fullname } = req.body;
        const payload = {
            "card_number": card_number,
            "cvv": cvv,
            "expiry_month": expiry_month,
            "expiry_year": expiry_year,
            "currency": "NGN",
            "amount": finduserCart === null || finduserCart === void 0 ? void 0 : finduserCart.bill,
            "redirect_url": "https://www.google.com",
            "fullname": fullname,
            "email": "developers@flutterwavego.com",
            "phone_number": "09000000000",
            "enckey": "FLWSECK_TESTb9be6f2f5b56",
            "tx_ref": (0, uuid_1.v4)()
        };
        const response = yield flw.Charge.card(payload);
        console.log(response);
        if (response.meta.authorization.mode === "pin") {
            let payload2 = payload;
            payload2.authorization = {
                "mode": "pin",
                // "fields": [
                //     "pin"
                // ],
                "pin": 3310
            };
            const reCallCharge = yield flw.Charge.card(payload2);
            const callValidate = yield flw.Charge.validate({
                "otp": "12345",
                "flw_ref": reCallCharge.data.flw_ref
            });
            // console.log(callValidate)
            //     if(callValidate.status === "success")
            //     {
            //         const createOrder = await orderModel.create({
            //             user: finduserCart?.user,
            //             orderItems: finduserCart?.cartItems,
            //             bill:finduserCart?.bill
            //         })
            //         await cartModel.findByIdAndDelete({_id: finduserCart?._id})
            //         return res.status(201).json({
            //             message: "payment successfully made",
            //             data: "check your order"
            //         })
            // }else 
            // {
            //     return res.status(201).json({
            //         message: "Error in making payment"
            //     })
            // }
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.mesaage,
            error: error.message
        });
    }
});
exports.checkOut = checkOut;
