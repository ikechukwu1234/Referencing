import mongoose from "mongoose";

const url: string = "mongodb://0.0.0.0:27017/workingonreference"
const onLine : string = "mongodb+srv://ikechukwuumezurike465:g7zOJkdyv3G91pJI@cluster0.q7n6gqu.mongodb.net/ecommerce"

mongoose.connect(onLine).then(() => {
    console.log("database connected successfully")
}).catch((error:any) => {
    console.log("an error occurred", error)
})

export default mongoose