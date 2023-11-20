import mongoose from "mongoose";

interface product {
    name:string,
    img:string,
    price:number,
    desc:string,
    qty:number,
    category:string,
    createdby: {}
}

interface iProduct extends product, mongoose.Document{ }

const proSchema = new mongoose.Schema({
   name: {
    type:String
   } ,
   img: {
    type: String
   },
   price: {
    type:Number
   },
   desc: {
    type:String
   },
   Quantity: {
    type:Number
   },
   category: {
    type:String
   },
   createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
   }
},
    {timestamps:true}
) 

export default mongoose.model<iProduct>("products", proSchema)