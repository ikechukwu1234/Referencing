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

function generateStudentId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  const length = 6;
  let randomId = "";
  for (let i = 0; i < length; i++) {
    randomId += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomId;
}

export const createCat = async (req: Request, res: Response) => {
  try {
    const { name, parent } = req.body;
    if (!name) {
      return res.status(401).json({
        success: 0,
        message: "name can't be empty",
      });
    }
    const { userId } = req.params;
    console.log(userId);
    const getUser = await userModel.findOne({ _id: userId });
    console.log(getUser);

    const dataCat: any = await categoryModel.create({
      name,
      parent,
      slug: `${slugify(name)}-${generateStudentId()}`,
    });

    dataCat.user = getUser;
    dataCat.save();

    return res.status(201).json({
      message: dataCat,
    });

    // return res.status(201).json({
    //     message: "posted"
    // })
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
      error: error.message,
    });
  }
};

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryModel.find()
    console.log(category)
    return res.status(200).json({
      message: "all category",
      success: 1,
      result:category,
      
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
      error: error.message,
    });
  }
};

export const getOneCategory = async (req:Request, res:Response) => {
  try{
    const getCategory = await categoryModel.findById(req.params.catId)
    return res.status(200).json({
      message: "successfully",
      data: getCategory
    })
  }catch (error:any)
  {
    return res.status(401).json({
      message: error.message,
      error: error.message
    })
  }
}

// export const deleteCat = async (req:)
