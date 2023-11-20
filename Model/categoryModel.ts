import mongoose from "mongoose";

interface category {
    name:string;
    parent:string;
    slug:string;
    user:{};
     products:{}[]
}

interface iCategory extends category, mongoose.Document{ }

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
    },
    parent:{
        type: String,
    },
    slug: {
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
     products:[{
         type: mongoose.Schema.Types.ObjectId,
         ref: "product"
     }]

},
    {timestamps:true}

)

export default mongoose.model<iCategory>("category", categorySchema)