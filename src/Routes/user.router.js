import { Router } from "express"
import userController from "../controllers/user.controller.js"
import { uploader } from "../utils.js"


//isntancio la clase cartManager

const UC = new userController()

const userRouter=Router()


userRouter.post('/user/:email/cart/:cid',UC.addCart)

userRouter.post('/user/register',UC.registrationWithHandleError)

userRouter.get('/user/:uid',UC.getUserById)

userRouter.post('/user/premium/:uid',UC.changeRole)

userRouter.post('/user/:uid/documents/document',uploader.single('document'),UC.uploader)

userRouter.post('/user/:uid/documents/profile',uploader.single('profile'),UC.uploader)

userRouter.post('/user/:uid/documents/product',uploader.single('product'),UC.uploader)

export default userRouter