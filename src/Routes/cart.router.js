import { Router } from "express"
import cartController from "../controllers/cart.controller.js"


//isntancio la clase cartManager

const CC = new cartController()

const cartRouter=Router()

//crea el carrito
cartRouter.post('/carts/', CC.createCart )

//obtener carrito por id
cartRouter.get('/carts/:cid', CC.getCartById)

//elimino los productos del carrito
cartRouter.delete('/carts/:cid',CC.deleteTotalProduct)

//mostrar todos los carritos
cartRouter.get('/carts', CC.getCarts)

//agregar producto al carrito
cartRouter.post('/carts/:cid/product/:pid', CC.addProduct)

//eliminar producto del carrito
cartRouter.delete('/carts/:cid/product/:pid', CC.deleteProduct )

//actualizar cantidad de producto carrito
cartRouter.put('/carts/:cid/product/:pid', CC.updateProduct)

//agregar productos a un carrito
cartRouter.put('/carts/:cid', CC.updateCart)


export default cartRouter