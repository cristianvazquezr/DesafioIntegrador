import { Router } from "express"
import userController from "../controllers/user.controller.js"


//isntancio la clase cartManager

const UC = new userController()

const userRouter=Router()

userRouter.post('/user/:email/cart/:cid',UC.addCart)

export default userRouter