import mongoose from "mongoose";

interface profile {
    firstName:string,
    lastName:string,
    gender:string,
    phoneNumber:string,
    dateOfBirth:string,
    avatar:string,
    user:{}

}

interface iProfile extends profile, mongoose.Document{ }

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    gender:{
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    avatar:{
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
},
    {timestamps:true}
)

export default mongoose.model("profiles", profileSchema)
