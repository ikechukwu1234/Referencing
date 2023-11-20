import express, {Application} from "express"
import  cors  from "cors"
import userRouter  from "./Route/userRoute"
import  profileRoute from "./Route/profileRoute"
import categoryRoute from "./Route/categoryRoute"
import productRoute from "./Route/productRoute"
import cartRoute from "./Route/cartRoute"
import orderRoute from "./Route/orderRoute"

export const mainApp = (app:Application) => {
    app.use(cors()).use(express.json())
    .use("/api/v1", userRouter)
    .use("/api/v1", profileRoute)
    .use("/api/v1", categoryRoute)
    .use("/api/v1", productRoute)
    .use("/api/v1", cartRoute)
    .use("/api/v1", orderRoute)
    .get("/page/data", (req:any, res:any) => {
        const id = req.params.id
        const userName = "Tosin"
        res.render("VerifyAccount", {userName, id})
    })
    .get("/api/v1", (req:any, res:any) => {

        res.status(200).json({
            message: "api is ready"
        })
    })
}