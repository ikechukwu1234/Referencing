import express from "express"
import upload from "../Utils/multer"

import  {editProfile, editImage, getAllProfile, getSingleProfile, DeleteProfile} from "../Controller/profileController"

const router = express.Router()

router.route("/edit/pro/:ProfileId").put(editProfile)
router.route("/edit/image/:ProfileId").put(upload, editImage)
router.route("/get/profile").get(getAllProfile)
router.route("/get-one/:ProfileId").get(getSingleProfile)
router.route("/delete/profile/:ProfileId").delete(DeleteProfile)

export default router