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
  import productModel from "../Model/productModel";
import mongoose from "mongoose";
import path from "path"

//   import slugify from "slugify";


export const createProduct = async (req:any, res:Response) => {
    try{
        const {name, desc, price, qty, category} = req.body
        console.log("asdflkjh",req.user._id)
        // if (!name || !desc || !price || !qty || !category)
        // return res.status(404).json({
        //   message: "enter all field"  
        // })

       

        const {catId} = req.params
        console.log(catId)
        const getCat:any = await categoryModel.findOne({_id:catId})
        console.log(getCat)

        const {userId} = req.params
        console.log(userId)
        const getUser = await userModel.findOne({_id:userId})
        console.log(getUser)
          const imageUrl = await cloudinary.uploader.upload(req.file.path)
          console.log(imageUrl)

        if (req.user.role === "admin")
        {
                
        const dataProduct:any = await productModel.create({
            name,
            desc,
            price,
            qty,
            category,
            img: "imahe.jpg"
            
       })

       getCat.products.push(new mongoose.Types.ObjectId(dataProduct._id))
       getCat.save()

       dataProduct.createdby = getUser
       dataProduct.save()

       return res.status(201).json({
        success:1,
        message:dataProduct
       })
        }else
        {
            return res.status(201).json({
                message: "only admin can post"
            })
        }
    

    }catch(error:any)
    {
        return res.status(400).json({
            message: error.message,
            error:error.message
        })
    }
} 


export const getSingleProduct = async (req:Request, res:Response) => {
    try
    {
        const {ProfileId} = req.params
        const fetchData = await productModel.findById(ProfileId)
        return res.status(200).json({
            message: "single product available",
            data: fetchData
        })
    }catch (error: any) {
        return res.status(400).json({
            error: error.message
        })
    }
}

export const ViewAllProduct = async (req:Request, res:Response) => {
    try
    {
        const ViewProduct = await productModel.find()
        return res.status(200).json({
            message: "all product available",
            data: ViewProduct
        })
    }catch (error:any)
    {
        return res.status(400).json({
            message: error.message,
            error: error.mesaage
        })
    }
}
  

export const DeleteProduct = async (req:Request, res:Response) => {
    try
    {
        const {ProductId} = req.params
        const ProductDelete = await productModel.findByIdAndDelete(ProductId)
        return res.status(200).json({
            message: "product deleted successfully",
            data: ProductDelete
        })
    }catch(error:any)
    {
        return res.status(400).json({
            message: error.message,
            error: error.message
        })
    }
}