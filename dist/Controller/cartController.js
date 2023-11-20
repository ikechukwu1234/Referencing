"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveFromCart = exports.addToCart = void 0;
const cartModel_1 = __importDefault(require("../Model/cartModel"));
const userModel_1 = __importDefault(require("../Model/userModel"));
const productModel_1 = __importDefault(require("../Model/productModel"));
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
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { userId } = req.params;
        const getUser = yield userModel_1.default.findOne({ _id: userId });
        // console.log(getUser)
        const getProduct = yield productModel_1.default.findOne({ _id: productId });
        // console.log(getProduct)
        const checkUserCart = yield cartModel_1.default.findOne({ user: userId });
        if (checkUserCart) {
            const findIndexProduct = checkUserCart.cartItems.findIndex((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.product) === null || _a === void 0 ? void 0 : _a.equals(productId); });
            console.log("uisdui", findIndexProduct);
            if (findIndexProduct > -1) {
                const userSelectPro = checkUserCart.cartItems[findIndexProduct];
                console.log(userSelectPro);
                userSelectPro.quantity += 1;
                checkUserCart.bill = checkUserCart.cartItems.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0);
                checkUserCart.cartItems[findIndexProduct] = userSelectPro;
                yield checkUserCart.save();
                return res.status(201).json({
                    message: "you have order before",
                    result: checkUserCart
                });
            }
            else {
                checkUserCart.cartItems.push({ product: getProduct === null || getProduct === void 0 ? void 0 : getProduct._id, quantity: 1, price: getProduct === null || getProduct === void 0 ? void 0 : getProduct.price });
                yield checkUserCart.save();
                checkUserCart.bill = checkUserCart.cartItems.reduce((acc, curr) => {
                    console.log(curr);
                    return acc + curr.quantity * curr.price;
                }, 0);
                return res.status(201).json({
                    message: "new product added",
                    result: checkUserCart
                });
            }
        }
        else {
            const dataCart = yield cartModel_1.default.create({
                user: getUser === null || getUser === void 0 ? void 0 : getUser._id,
                cartItems: [{ product: getProduct === null || getProduct === void 0 ? void 0 : getProduct._id, quantity: 1, price: getProduct === null || getProduct === void 0 ? void 0 : getProduct.price }],
                bill: 1 * (getProduct === null || getProduct === void 0 ? void 0 : getProduct.price)
            });
            return res.status(201).json({
                message: "successFully add to cart",
                result: dataCart
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.addToCart = addToCart;
const RemoveFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params;
        let productId = req.query.productId;
        console.log(productId);
        const checkUserCart = yield cartModel_1.default.findOne({ user: userId });
        console.log(checkUserCart);
        const position = yield ((_a = checkUserCart === null || checkUserCart === void 0 ? void 0 : checkUserCart.cartItems) === null || _a === void 0 ? void 0 : _a.findIndex((item) => (item === null || item === void 0 ? void 0 : item.product) == productId));
        console.log("asdf", position);
        if (checkUserCart) {
            const item = checkUserCart.cartItems[position];
            console.log(item);
            if (item.quantity > 1) {
                item.quantity -= 1;
                checkUserCart.bil -= item.price;
            }
            else {
                checkUserCart.bill -= item.quantity * item.price;
                if (checkUserCart.bill < 0) {
                    checkUserCart.bill = 0;
                }
                checkUserCart.cartItems.splice(position, 1);
            }
            checkUserCart.bill = checkUserCart.cartItems.reduce((acc, cur) => {
                console.log(cur);
                return acc + cur.quantity * cur.price;
            }, 0);
            yield checkUserCart.save();
            return res.status(201).json({
                message: "item has been removed"
            });
        }
        else {
            return res.status(400).json({
                message: "you don't have any items"
            });
        }
    }
    catch (error) {
        error: error.mesaage;
    }
});
exports.RemoveFromCart = RemoveFromCart;
