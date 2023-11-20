"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controller/userController");
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
const router = express_1.default.Router();
router.post("/create-user", userController_1.RegisterUser);
router.get("/:id", userController_1.getSingleUser);
router.get("/get/alluser", userController_1.retrieveAllUser);
router.route("/login").post(userController_1.login);
router.route("/logout-user").get(userController_1.LogOut);
router.route("/delete/:userId").delete(userController_1.DeleteUser);
router.route("/account/verify/id").get(userController_1.verifyUser);
exports.default = router;
