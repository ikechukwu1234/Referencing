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
exports.VerifyUser = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const GOOGLE_SECRET = "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";
const GOOGLE_ID = "532130122121-nqhrpd1av6ej6hm0bh8md3pjpddsphku.apps.googleusercontent.com";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
const GOOGLE_REFRESHTOKEN = "1//04_v79BWSSM-MCgYIARAAGAQSNwF-L9IrefATJu65dvekk6pswW9DqLQzx9IKa-WroHJzTZUznxdfd3bJhr5_v1CG2ph6RggUnfE";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });
const VerifyUser = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            // host: "smtp.gmail.com",
            port: 587,
            service: "gmail",
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                type: "OAuth2",
                user: 'ikechukwuumezurike465@gmail.com',
                refreshToken: GOOGLE_REFRESHTOKEN,
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                accessToken: accessToken,
                //   pass: 'eeod dgss xpzj vukf@1997'
            },
        });
        //   const buildFile = path.join(__dirname, "../Views/VerifyAccount.ejs")
    }
    catch (error) {
        console.log("try again");
        console.log(error);
    }
});
exports.VerifyUser = VerifyUser;
