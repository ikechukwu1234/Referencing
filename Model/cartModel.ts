import mongoose from "mongoose"


interface cart {
    user: string,
    cartItems: {}[]
    bill: number
}

interface iCart  extends cart, mongoose.Document{}

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    cartItems: [{
        product: {type:mongoose.Schema.Types.ObjectId},
        quantity: {type:Number, default:1, min:1},
        price: {type:Number}
    }],
    bill:{
        type:Number,
        default:0
    }
})

export default mongoose.model("cart", cartSchema)