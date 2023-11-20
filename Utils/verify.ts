import jwt from "jsonwebtoken"

export const verifyToken = async (req: any, res: any, next: any) => {
    // const getSession = req.headers["cookie"]

    // if (!getSession)
    // {
    //     return res.status(404).json({
    //         message: "please login in, to get token "
    //     })
    // }

    // const tokencookies = await getSession.split("=")[1]
    // console.log("ghsd", tokencookies)
    // if (tokencookies)
    // {
    //     const token = await tokencookies
    //     jwt.verify(token, "classwork", (err:any, payload:any)=> {
    //         if (err)
    //         {
    //             return res.status(404).json({
    //                 message:"token expire"
    //             })
    //         }
    //         req.user = payload
    //         next()
    //     })

    // } else
    // {
    //     return res.status(404).json({
    //        mesage:"please provide a valid token"
    //    }) 
    // }

    if (req.headers.authorization)
    {
        const token = await req.headers.authorization.split(" ")[1]
        console.log(token)
        jwt.verify(token, "classwork", (err:any, payload:any) => {
            if(err)
            {
                return res.status(404).json({
                    message: "token expire"
                })
            }
            req.user = payload
            next()
        })
    }else
    {
        return res.status(400).json({
            message: "please provide a valid token"
        })
    }
}
