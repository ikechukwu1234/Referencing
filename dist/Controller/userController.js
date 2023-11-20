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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.DeleteUser = exports.LogOut = exports.login = exports.retrieveAllUser = exports.getSingleUser = exports.RegisterUser = void 0;
const profileModel_1 = __importDefault(require("../Model/profileModel"));
const userModel_1 = __importDefault(require("../Model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
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
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password, role } = req.body;
        if (!userName || !email || !password) {
            return res.status(401).json({
                success: 0,
                message: "all field required",
            });
        }
        const checkEmail = yield userModel_1.default.findOne({ email: email });
        console.log(checkEmail);
        if (checkEmail) {
            return res.status(401).json({
                success: 0,
                message: "email already exist",
            });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const createData = yield userModel_1.default.create({
            userName,
            email,
            password: hashed,
            role
        });
        const createProfile = yield profileModel_1.default.create({
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
            from: '"Ike store 👻❤👍" <foo@example.com>',
            to: email,
            subject: "IKE STORE",
            // text: "Hello world?", // plain text body
            html: `<b>PLEASE CLICK THE LINK <a href="http://localhost:5500/api/v1/account">link</a> to verify account</b>`, // html body
        };
        yield transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log("error sending mail", error);
            }
            else {
                console.log("email send", info.response);
            }
        });
        return res.status(201).json({
            message: "registration successfully",
            data: createData,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to register user",
            error: error.message,
        });
    }
});
exports.RegisterUser = RegisterUser;
// const createUser = await userModel.create({
//     userName,
//     email,
//     password
// });
// return res. status(201).json({
//     message: "user register successfully",
//     data:createUser
// })
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getSingle = yield userModel_1.default.findById(req.params);
    try {
        const getSingle = yield userModel_1.default.findById(req.params.id).populate({
            path: "profile",
            select: "firstName lastName gender phoneNumber dateOfBirth",
        });
        return res.status(201).json({
            message: "successfully",
            data: getSingle,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to register user",
            error: error.message,
        });
    }
});
exports.getSingleUser = getSingleUser;
const retrieveAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retrieveUser = yield userModel_1.default.find();
        return res.status(200).json({
            message: "all users on board",
            data: retrieveUser,
        });
    }
    catch (error) {
        return res.status(400).json({
            mesaage: "an error occured",
            error: error.message,
        });
    }
});
exports.retrieveAllUser = retrieveAllUser;
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
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "all field required"
            });
        }
        const checkEmail = yield userModel_1.default.findOne({ email: email });
        console.log(checkEmail);
        if (checkEmail) {
            const checkPassword = yield bcrypt_1.default.compare(password, checkEmail.password);
            if (checkPassword) {
                const _a = checkEmail._doc, { password } = _a, info = __rest(_a, ["password"]);
                let options = {
                    expiresIn: "3d"
                };
                const token = jsonwebtoken_1.default.sign({ _id: checkEmail._id, userName: checkEmail.userName, email: checkEmail.email, role: checkEmail.role }, "classwork", { expiresIn: "7d" });
                console.log(token);
                res.cookie("sessonId", token, options);
                console.log("asdf", req.headers['cookies']);
                return res.status(200).json({
                    message: "log in successfully",
                    data: { info, token },
                    // token: token
                    //  result:{info, token}
                });
            }
            else {
                return res.status(401).json({
                    message: "incorrect password"
                });
            }
        }
        else {
            return res.status(401).json({
                message: "account not found"
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});
exports.login = login;
const LogOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("sessionId");
        res.setHeader('Clear-Site-Data', '"cookies", "storage"');
        return res.status(200).json({
            message: "Signout successfully"
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.mesaage
        });
    }
});
exports.LogOut = LogOut;
const DeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const Delete = yield userModel_1.default.findByIdAndDelete(userId);
        return res.status(200).json({
            message: "user deleted successfully",
            data: Delete
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.DeleteUser = DeleteUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.params.id);
        console.log(user);
        const verifyData = yield userModel_1.default.findByIdAndUpdate(req.params.id, {
            verify: true
        }, { new: true });
        return res.status(200).json({
            message: "account has been verify proceed to login"
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.verifyUser = verifyUser;
