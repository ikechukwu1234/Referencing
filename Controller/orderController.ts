import express, {
    Application,
    Request,
    Response,
    NextFunction,
    application,
  } from "express";
  import userModel from "../Model/userModel";
  import profileModel from "../Model/profileModel";
  import categoryModel from "../Model/categoryModel";
  import cloudinary from "../Utils/cloudinary";
  import slugify from "slugify";
import cartModel from "../Model/cartModel";
import orderModel from "../Model/orderModel";
import {v4 as uuidv4} from "uuid"
import Flutterwave from "flutterwave-node-v3"



  const flw = new Flutterwave("FLWFLWPUBK_TEST-3355c8d953d7e3b8472df89a9a505cb9-X", "FLWSECK_TEST-173a199b3d8796bb42b363f1ae3f30d6-X");

   export const  checkOut = async (req:Request, res:Response) => {
    try
    {
        const {userId} = req.params 
        const finduserCart = await cartModel.findOne({user: userId})
        console.log(finduserCart?.bill)
        const {card_number, cvv, expiry_month, expiry_year, fullname} = req.body
        const payload = {
            "card_number": card_number,
            "cvv": cvv,
            "expiry_month": expiry_month,
            "expiry_year": expiry_year,
            "currency": "NGN",
            "amount": finduserCart?.bill,
            "redirect_url": "https://www.google.com",
            "fullname": fullname,
            "email": "developers@flutterwavego.com",
            "phone_number": "09000000000",
            "enckey": "FLWSECK_TESTb9be6f2f5b56",
            "tx_ref": uuidv4()
        
        }
        
        const response =  await flw.Charge.card(payload)
        console.log(response)

        if(response.meta.authorization.mode === "pin")
        {
            let payload2 :any = payload
            payload2.authorization = {
                "mode": "pin",
                // "fields": [
                //     "pin"
                // ],
                "pin": 3310
            }
            const reCallCharge = await flw.Charge.card(payload2)
            const callValidate = await flw.Charge.validate({
                "otp": "12345",
                "flw_ref": reCallCharge.data.flw_ref
            })

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

      
    }catch (error:any)
    {
        return res.status(400).json({
            message: error.mesaage,
            error: error.message
        })
    }
   }