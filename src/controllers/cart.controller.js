import cartManager from "../dao/cartManager.js";

class cartController {
    constructor(){
        this.CM=new cartManager()
    }

    createCart=async (req, resp)=>{

        let newCart= await this.CM.createCart()
       
        if(newCart){
            resp.send(newCart)
            
        } else{
            resp.status(500).send({status:"error", message:"no se pudo crear el carrito"})
        }
    
    }

    getCartById=async (req,resp)=>{
        let cid=req.params.cid
    
        if((cid==undefined)){
            resp.status(500).send({status:'error', message:"no definio un id o el mismo es incorrecto."})
        }else{
            let respuesta=await this.CM.getCartById(cid)
            if(respuesta==false){
                resp.status(500).send({status:'error', message:"no existe el id"})
                
            }else{
                resp.send(await respuesta)
                
            }   
        }  
    }
    deleteTotalProduct=async (req,resp)=>{
        let cid=req.params.cid
    
        const deleteProductos = await this.CM.deleteTotalProduct(cid)
    
        if((await deleteProductos=='productosEliminado')){
            resp.send("se eliminaron todos los productos correctamente")
        }else{
            resp.status(500).send({status:'error', message:"no existe ningun carrito con ese id"})
        }
    }

    getCarts=async (req,resp)=>{
        resp.send(await this.CM.getCarts())
    }
    addProduct=async (req,resp)=>{
        const cid=req.params.cid
        const pid=req.params.pid
        const {quantity}=req.body
        const agregarProducto = await this.CM.addProduct(cid, pid, quantity)
    
        if((await agregarProducto=='productoAgregado')){
            resp.send("se agrego el producto correctamente")
        }else if(await agregarProducto=="pidNotFound"){
            resp.status(500).send({status:'error', message:"no se encontro el producto con ese id"})
        }else{
            resp.status(500).send({status:'error', message:"no se encontro el carrito con ese id"})
        } 
    }
    deleteProduct= async (req,resp)=>{
        const cid=req.params.cid
        const pid=req.params.pid
    
        const deleteProducto = await this.CM.deleteProduct(cid, pid)
    
        if((await deleteProducto=='productoEliminado')){
            resp.send("se elimino el producto correctamente")
        }else if(await deleteProducto=="pidNotFound"){
            resp.status(500).send({status:'error', message:"no existe ningun producto en el carrito con ese id"})
        }else{
            resp.status(500).send({status:'error', message:"no se encontro el carrito con ese id"})
        } 
    }
    updateProduct=async (req,resp)=>{
        const cid=req.params.cid
        const pid=req.params.pid
        const {quantity}=req.body
    
        const agregarProducto = await this.CM.updateProduct(cid, pid, quantity)
    
        if((await agregarProducto=='productoActualizado')){
            resp.send("se actualizo el producto correctamente")
        }else if(await agregarProducto=="pidNotFound"){
            resp.status(500).send({status:'error', message:"no se encontro el producto con ese id"})
        }else{
            resp.status(500).send({status:'error', message:"no se encontro el carrito con ese id"})
        } 
    }

    updateCart=async (req,resp)=>{
        const cid=req.params.cid
        const products=req.body
    
        const agregarProducto = await this.CM.updateCart(cid,products)
    
        if((await agregarProducto=='carritoActualizado')){
            resp.send("se actualizo el carrito correctamente")
        }else if(agregarProducto=="productosInvalidos"){
            resp.status(500).send({status:'error', message:"ingreso un ID de producto que no existe"})
        } else{
            resp.status(500).send({status:'error', message:"No existen carritos con ese ID elegido"})
        }
    }
}

export default cartController