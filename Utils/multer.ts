import multer, { } from "multer"
import express, {Request} from "express"
import path from "path"

type callBackDestination = (err:Error | null, destination:string) => void
type fileNameCallBack = (err: Error | null, filename:string) => void

const storage = multer.diskStorage({
    destination:function(req:Request, file:any, cb:callBackDestination){
        cb(null, path.join(__dirname, "../Uploads"))
    },
    filename:function(req:Request, file:any, cb:fileNameCallBack) {
        const uniqueStuffix = Date.now() + "-" + Math.round(Math.random()*1e9)
        cb(null, file.originalname)
    }
})
//  const upload = multer({storage: storage}).single("avatar")
const upload = multer({storage: storage}).single("img")


type callBackDestinations = (err:Error | null, destination:string) => void
type fileNameCallBacks = (err: Error | null, filename:string) => void

const avatarstorage = multer.diskStorage({
    destination:function(req:Request, file:any, cb:callBackDestination){
        cb(null, path.join(__dirname, "../Uploads"))
    },
    filename:function(req:Request, file:any, cb:fileNameCallBack) {
        const uniqueStuffix = Date.now() + "-" + Math.round(Math.random()*1e9)
        cb(null, file.originalname)
    }
})
//  const upload = multer({storage: storage}).single("avatar")


 export default upload