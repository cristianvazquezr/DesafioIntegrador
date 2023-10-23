import { Router } from "express"
import viewsController from "../controllers/views.controller.js"
import { authorization } from "../utils.js"
//creo el middleware para autenticar administrador
function authAdmin(req, res, next) {
    if (req?.admin) {
    return next()
    }
    return res.status(401).send('error de autorización! Ingrese con un usuario administrador')
}

//creo el middleware para autenticar logueo
function auth(req, res, next) {

    if (req.user) {
    return next()
    }
    return res.status(401).send('error de autorización!').redirect("/login")
}

//creo el middleware para autenticar logueo
function authLogin(req, res, next) {

    if (req.user) {
        res.redirect("/products")
        return res.status(401).send('error de autorización!')
    }
    return next()
}


//instancio la clase viwsController

const VC = new viewsController()

const viewsRouter=Router()

viewsRouter.get('/',VC.home)

viewsRouter.get('/products',auth, VC.products)

viewsRouter.get('/realtimeproducts',authorization('admin'),VC.realTimeProducts)

viewsRouter.get('/chat',authorization('user'),VC.chat)

viewsRouter.get('/cart/:cid', auth,VC.cart)

viewsRouter.get('/login',authLogin ,VC.login)

viewsRouter.get('/register',authLogin,VC.register)

viewsRouter.get('/profile',VC.profile)

viewsRouter.get('/restore',VC.restore)

viewsRouter.get('/purchase/:tid',VC.purchase)

export default viewsRouter  