import profileModel from "../Model/profileModel";
import userModel from "../Model/userModel";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"




const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  service: "gmail",                           
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'ikechukwuumezurike465@gmail.com',
    pass: 'eeod dgss xpzj vukf@1997'
  }
});




export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password, role } = req.body;
    if (!userName || !email || !password) {
      return res.status(401).json({
        success: 0,
        message: "all field required",
      });
    }

    const checkEmail = await userModel.findOne({ email: email });
    console.log(checkEmail);
    if (checkEmail) {
      return res.status(401).json({
        success: 0,
        message: "email already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const createData = await userModel.create({
      userName,
      email,
      password: hashed,
      role
    });

    const createProfile: any = await profileModel.create({
      _id: createData._id,
      firstName: "",
      lastName: "",
      gender: "",
      avatar: "",
    });

    createData.profile = createProfile._id;
    createData.save();

    createProfile.user = createData._id;
    createProfile.save();

    let mailOption = {
      from: '"Ike store 👻❤👍" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: "IKE STORE", // Subject line
      // text: "Hello world?", // plain text body
      html: `<b>PLEASE CLICK THE LINK <a href="http://localhost:5500/api/v1/account">link</a> to verify account</b>`, // html body
    }

    await transporter.sendMail(mailOption, (error:any, info:any) => {
      if (error)
      {
        console.log("error sending mail", error)
      }else{
        console.log("email send", info.response)
      }
    })
  

    return res.status(201).json({
      message: "registration successfully",
      data: createData,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "failed to register user",
      error: error.message,
    });
  }
};

// const createUser = await userModel.create({
//     userName,
//     email,
//     password
// });
// return res. status(201).json({
//     message: "user register successfully",
//     data:createUser
// })

export const getSingleUser = async (req: Request, res: Response) => {
  const getSingle = await userModel.findById(req.params);
  try {
    const getSingle = await userModel.findById(req.params.id).populate({
      path: "profile",
      select: "firstName lastName gender phoneNumber dateOfBirth",
    });
    return res.status(201).json({
      message: "successfully",
      data: getSingle,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "failed to register user",
      error: error.message,
    });
  }
};

export const retrieveAllUser = async (req: Request,res: Response):Promise<Response> => {
  try {
    const retrieveUser = await userModel.find();
    return res.status(200).json({
      message: "all users on board",
      data: retrieveUser,
    });
  } catch (error: any) {
    return res.status(400).json({
      mesaage: "an error occured",
      error: error.message,
    });
  }
};

// export const  RegisterProfile = async(req:Request, res:Response) =>{
//     try{
//         const {firstName, lastName, gender, phoneNumber, dateOfBirth} = req.body

//         const createProfile = await profileModel.create({
//             firstName,
//             lastName,
//             gender,
//             phoneNumber,
//             dateOfBirth
//         });
//         const findUser = await userModel.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set : {profile: createProfile._id},
//             },
//             {new: true}
//         );
//         await findUser?.save();
//         return res.status(200).json({
//             message: "profile created successfully",

//         });

//     }catch (err) {
//         return err
//     }
// };

// export const ViewSingleUser =  async (req:Request, res:Response) => {
//     try{
//         const findUser = await userModel.findById(req.params.id).populate("profile",)
//         return res.status(200).json({
//             message: "profile created successfully",
//             data: findUser
//         });
//     }catch (err) {
//         return err
//     }
// }
//  export const login = async (req:Request, res:Response)=> {
//      try{
//          const {email, password} = req.body
//          if (!email || !password)
//          {
//              return res. status (401).json({
//                  message: "enter all filed"
//              })
//         }
//          const checkEmail
//      }catch (error: any)
//      {
//       return 
//      }
// }


export  const login = async (req:Request, res:Response):Promise<Response>=> {
  try
  {
      const {email, password} = req.body
      if (!email || !password)
      {
          return res.status(401).json({
              message: "all field required"
          })
      }
      const checkEmail:any = await userModel.findOne({email: email})
      console.log(checkEmail)
      if (checkEmail)
      {
          const checkPassword = await bcrypt.compare(password, checkEmail.password)
          if (checkPassword)
          {
            const {password, ...info} = checkEmail._doc
            let options:any = {
              expiresIn: "3d"
            }

              const token = jwt.sign(
                  {_id: checkEmail._id, userName: checkEmail.userName, email: checkEmail.email, role:checkEmail.role },
                  "classwork",
                  {expiresIn: "7d"}
              )
               console.log(token)
              res.cookie("sessonId", token, options)
              console.log("asdf",req.headers['cookies'])
             return res.status(200).json({
              message: "log in successfully",
              data: {info, token},
              // token: token
              //  result:{info, token}
             })
          }else
          {
              return res.status(401).json({
                  message: "incorrect password"
              })
          }
      }else
      {
          return res.status(401).json({
              message: "account not found"
          })
      }
  }catch(error:any)
  {
        return res.status(400).json({
  
              error:error.message
          })
      
  }
}

export const LogOut = async (req:Request, res:Response) => {
  try
  {
    res.clearCookie("sessionId")
    res.setHeader('Clear-Site-Data', '"cookies", "storage"');
    return res.status(200).json({
      message: "Signout successfully"
    })
  }catch (error:any)
  {
    return res.status(404).json({
      message: error.mesaage
    })
  }
}


export const DeleteUser = async (req:Request, res:Response) => {
  try
  {
    const {userId} = req.params
    const Delete = await userModel.findByIdAndDelete(userId)
    return res.status(200).json({
      message: "user deleted successfully",
      data: Delete
    })
  }catch (error:any)
  {
    return res.status(400).json({
      message: error.message,
      error: error.message
    })
  }
}


export const  verifyUser = async (req:Request, res: Response) => {
  try
  {
    const user = await userModel.findById(req.params.id)
    console.log(user)

    const verifyData = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        verify: true
      },
      {new:true}
    )

    return res.status(200).json({
      message: "account has been verify proceed to login"
    })
  }catch(error:any)
  {
    return res.status(401).json({
      message: error.message,
      error: error.message
    })
  }
}