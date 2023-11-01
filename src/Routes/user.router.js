import { Router } from "express"
import userController from "../controllers/user.controller.js"


//isntancio la clase cartManager

const UC = new userController()

const userRouter=Router()

userRouter.post('/user/:email/cart/:cid',UC.addCart)

userRouter.post('/user/register',UC.registrationWithHandleError)

userRouter.get('/user/:uid',UC.getUserById)

export default userRouter