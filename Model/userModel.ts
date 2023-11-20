import mongoose from "mongoose";

interface  user{
    userName:string;
    email:string;
    password: string;
    profile:{},
    role: string
}

interface iUser extends user, mongoose.Document{ }

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
    },
    password:{
        type:String,
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user"
    },
    verify: {
        type: Boolean,
        default: false,
    },
    profile:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "profiles"
    }

},
     {timestamps:true}
)
export default mongoose.model<iUser>("users", userSchema)