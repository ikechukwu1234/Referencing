import {google} from "googleapis" 
import nodemailer from "nodemailer"





const GOOGLE_SECRET = "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"

const GOOGLE_ID = "532130122121-nqhrpd1av6ej6hm0bh8md3pjpddsphku.apps.googleusercontent.com";

const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground"

const GOOGLE_REFRESHTOKEN = "1//04_v79BWSSM-MCgYIARAAGAQSNwF-L9IrefATJu65dvekk6pswW9DqLQzx9IKa-WroHJzTZUznxdfd3bJhr5_v1CG2ph6RggUnfE"

const  oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({refresh_token: GOOGLE_REFRESHTOKEN});

export const  VerifyUser = async (name:any) => {
    try
    {
        const accessToken = await oAuth.getAccessToken()
        
const transporter = nodemailer.createTransport({
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
  })
//   const buildFile = path.join(__dirname, "../Views/VerifyAccount.ejs")
    }catch(error:any)
    {
        console.log("try again")
        console.log(error)
    }

}