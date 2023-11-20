import cloud, {v2} from "cloudinary"

const  cloudinary: typeof v2 = cloud.v2

cloudinary.config({
    cloud_name: "di7fvfnr8",
    api_key: "926349268892957",
    api_secret: "XbWlabxMPkLJG0otaK4Fei7DAGE"
})

export  default cloudinary