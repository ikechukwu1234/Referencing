import express, {Application, Request, Response, NextFunction, application} from "express"
import profileModel from "../Model/profileModel";
import userModel from "../Model/userModel";
import cloudinary from "../Utils/cloudinary";


export const editProfile = async (req:Request, res:Response) => {
    try
    {
        const {firstName, lastName, gender , phoneNumber, dateOfBirth} = req.body

        const {ProfileId} = req.params
        const getUpdate = await profileModel.findByIdAndUpdate(ProfileId,
            {
                firstName,
                lastName,
                gender,
                phoneNumber,
                dateOfBirth
            } ,
            {
                new: true
            }            
            )
            return res.status(201).json({
                message: "updated successfully",
                data: getUpdate
            })
    }catch (error:any)
    {
        return res.status(400).json({
            message: "failed to update profile",
            error: error.message
        })
    }
}

export const editImage = async (req:any, res:Response) => {
    try
    {
        const {ProfileId} = req.params

        console.log(req.file)
        const imageurl  = await cloudinary.uploader.upload(req.file.path)
        console.log("k10xlkjh", imageurl)
        const updateImage = await profileModel.findByIdAndUpdate(
            ProfileId,
            {
                avatar:imageurl.secure_url
            },
            {new:true}
        )
        return res.status(201).json({
            message: "image updated successfully"
        })
    }catch (error:any)
    {
        return res.status(400).json({
            message: error.message,
            error: error.message
        })
    }
}

export const getAllProfile = async (req:Request, res:Response) => {
    try
    {
        const getProfile = await profileModel.find()
        return res.status(200).json({
            message: "all profile on board",
            result: getProfile
        })
    }catch(error:any)
    {
        return res.status(400).json({
            message: "error to get all",
            error:error.message
        })
    }
}

export const getSingleProfile = async (req:Request, res:Response) => {
    try
    {
        const {ProfileId} = req.params
        const getSingle = await profileModel.findById(ProfileId)
        return res.status(200).json({
            message: "view single user",
            data: getSingle
        })
    }catch(error:any)
    {
        return res.status(400).json({
            message: error.message,
            error: error.message
        })
    }
}

export const DeleteProfile = async (req:Request, res:Response) => {
    try
    {
        const {ProfileId} = req.params
        const Delete = await profileModel.findByIdAndDelete(ProfileId) 
        return res.status(200).json({
            message: "profile deleted successfuly",
            data: Delete
        })
    }catch(error:any)
    {
        return res.status(400).json({
            message: error.message,
            error: error.message
        })
    }
} 
