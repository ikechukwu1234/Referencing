import mongoose from "mongoose";
import express from "express";
import {
  DeleteUser,
    LogOut,
  RegisterUser,
  getSingleUser,
  login,
  retrieveAllUser,
  verifyUser,
} from "../Controller/userController";
import jwt from "jsonwebtoken"
import { verifyToken } from "../Utils/verify";


// const verifyToken = async (req:any, res:any, next:any) =>{
//   const getSession = req.headers["cookie"]

//   if (!getSession)
//   {
//       return res.status(404).json({
//           message: "please login to get token"
//       })
//   }
//   const  tokencookies = getSession.split("=")[1]
//   console.log("asdf", tokencookies)
//   if(tokencookies)
//   {
//       const token = await tokencookies
//       jwt.verify(token, "classwork", (error:any, payload:any)=>{
//           if(error)
//           {
//               return res.status(404).json({
//                   message: "token expires"
//               })
//           }
//           req.user = payload
//           next()
//       })

//   }else
//   {
//       return res.status(404).json({
//           message: "please provide a valid token"
//       })
//   }
// }

const router = express.Router();

router.post("/create-user", RegisterUser);
router.get("/:id", getSingleUser);
router.get("/get/alluser", retrieveAllUser);
router.route("/login").post(login)
router.route("/logout-user").get(LogOut)
router.route("/delete/:userId").delete(DeleteUser)
router.route("/account/verify/id").get(verifyUser)

export default router;
