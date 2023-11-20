import cartModel from "../Model/cartModel";
import userModel from "../Model/userModel";
import productModel from "../Model/productModel";
import categoryModel from "../Model/categoryModel";
import slugify from "slugify";
import express, {Request, Response} from "express"


// export const addToCart = async (req:Request, res:Response) => {
//     try
//     {
//         const {quantityvalue} = req.body
//         const userId = req.params.userId
//         console.log(userId)
//         const checkUser = await userModel.findOne({_id: userId})
//         if (!checkUser) {
//             return res.status(404).json({
//                 message: "user not found"
//             })
//         }
//         const productId = req.params.productId
//         console.log(productId)
//         const checkProduct:any = await productModel.findOne({_id: productId})
//         console.log(checkProduct)

//         const quantity:any = quantityvalue || 1
//         const price = checkProduct?.Price * quantity

//         if (!checkProduct) {
//             return res.status(404).json({
//                 message: "product not found"
//             })
//         }
//         const catData = await cartModel. create({
//             user: userId,
//             cartItems: [{product:productId, quantity, price}],
//             bill:price * quantity
//         })

//         return res.status(201).json({
//             success: 1,
//             result: catData
//         })


//     }catch (error:any)
//     {
//         return res.status(400).json({
//             message:error.mesaage
//         })
//     }
// }


export const addToCart = async (req:Request, res:Response) => {
    try{
        const {productId} = req.params
        const {userId} = req.params

        const getUser = await userModel.findOne({_id: userId})
        // console.log(getUser)
        const getProduct: any = await productModel.findOne({_id: productId})
        // console.log(getProduct)

        const checkUserCart:any = await cartModel .findOne({user: userId})
        if (checkUserCart)
        {
            const findIndexProduct = checkUserCart.cartItems.findIndex((item: any) => item?.product?.equals(productId))
            console.log("uisdui", findIndexProduct)
            if (findIndexProduct > -1)
            {
            const userSelectPro = checkUserCart.cartItems[findIndexProduct]
            console.log(userSelectPro)
            userSelectPro.quantity += 1

            checkUserCart.bill = checkUserCart.cartItems.reduce((acc:any, curr:any) => {
                return acc + curr.quantity * curr.price
            },0)
            checkUserCart.cartItems[findIndexProduct] = userSelectPro
            await checkUserCart.save()

            return res.status(201).json({
                message: "you have order before",
                result: checkUserCart
            })
        }else
        {
            checkUserCart.cartItems.push({product: getProduct?._id, quantity: 1, price: getProduct?.price})
            await checkUserCart.save()
            checkUserCart.bill = checkUserCart.cartItems.reduce((acc:any, curr:any) => {
                console.log(curr)
                return acc + curr.quantity * curr.price

            },0)

            return res.status(201).json({
                message: "new product added",
                result: checkUserCart
            })
        }
    }else
    {
        const dataCart = await cartModel.create({
            user: getUser?._id,
            cartItems: [{product: getProduct?._id, quantity: 1, price: getProduct?.price}],
            bill: 1 * getProduct?.price
        })

        return res.status(201).json({
            message: "successFully add to cart",
            result: dataCart
        })
    }

    
          
    
    }catch (error: any)
    {
        return  res.status(400).json({
            message: error.message,
            error: error.message
        })
    }
}

export const RemoveFromCart = async(req:Request, res:Response) => {
    try
    {
        const {userId} = req.params
        let productId = req.query.productId

        console.log(productId)

        const checkUserCart:any = await cartModel.findOne({user: userId})
         console.log(checkUserCart)
         const position = await checkUserCart?.cartItems?.findIndex((item:any) => item?.product == productId)
          console.log("asdf",position)
        if(checkUserCart)
        {

            const item  = checkUserCart.cartItems[position]

            console.log(item)

            if (item.quantity > 1)
            {
                item.quantity -= 1
                checkUserCart.bil -= item.price
            }else
            {
                checkUserCart.bill -= item.quantity * item.price
                if(checkUserCart.bill < 0)
                {
                    checkUserCart.bill = 0
                }
    
                checkUserCart.cartItems.splice(position, 1)
            }
          

            checkUserCart.bill = checkUserCart.cartItems.reduce((acc:any, cur:any) => {
                console.log(cur)
                return acc + cur.quantity * cur.price
            }, 0)
            await checkUserCart.save()
            return res.status(201).json({
                message: "item has been removed"
            })
        }else{
            return res.status(400).json({
                message: "you don't have any items"
            })
        }
    }catch (error:any)
    {
        error: error.mesaage
    }
}