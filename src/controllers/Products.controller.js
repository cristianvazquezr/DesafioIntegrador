import ProductManager from "../dao/ProductManager.js";

class ProductController{
    constructor(){
        this.PM= new ProductManager();
    }
    getProducts = async (req,resp)=>{
        let productos=await this.PM.getProducts(req.query)
        if(productos){
            resp.send(productos)
        }else{
            resp.status(500).send({status:'error', message:"no se pudieron obtener los productos"})
        }
    
    }

    getProductById = async (req,resp)=>{
        let pid=req.params.pid
    
        if((pid==undefined)){
            resp.status.send(await this.PM.getProducts())
        }else{
            let respuesta=await this.PM.getProductById(pid)
            if(respuesta==false){
                resp.status(400).send("no existe el id")
            }else{
                resp.send(await this.PM.getProductById(pid))
            } 
        }  
    }
    addProduct= async (req,resp)=>{
    
        let {title, description, category, price, thumbnail, code, stock, owner}=req.body
        let roleUser=req.user.role
        let email=req.user.email
        if(roleUser=="premium"){
            owner=email
        }else{
            owner='admin'
        }
    
        let productos=await this.PM.addProduct(title, description, category, price, thumbnail, code, stock, owner)
       
        if(productos=="valorVacio"){
            resp.status(400).send({status:"error", message:"complete los campos obligatorios"})
        }else if(productos=="codeRepetido"){
            
            resp.status(400).send({status:"error", message:"ya existe producto con ese code"})
        } else{
            resp.status(200).send({status:"OK", message:"se agrego correctamente"})
        }
    }

    updateProduct = async (req,resp)=>{
        const id = req.params.pid
        let {title, description, category, price, thumbnail, code, stock,owner}=req.body
        
    
        let productos=await this.PM.updateProduct(id,title, description, category, price, thumbnail, code, stock, owner)
       
        if(productos=="valorVacio"){
            resp.status(400).send({status:"error", message:"complete los campos obligatorios"})
        }else if(productos=="codeRepetido"){
            resp.status(400).send({status:"error", message:"ya existe producto con ese code"})
        }else if(productos=="idInvalido"){
            resp.status(400).send({status:"error", message:"no existen productos con ese ID"})
        } else{
            resp.status(200).send("se actualizo correctamente")
        }
    }

    deleteProduct=async (req,resp)=>{
        const id =req.params.pid
        let user = req.user.email
        let productos=await this.PM.deleteProduct(id,user)
       
        if(productos){
            resp.status(200).send({status:"OK", message:"se elimino el producto correctamente"})
    
        }else{
            resp.status(400).send({status:"error", message:"no se encontro el elemento, o no posee permisos, asegurese de ser administrador o premium"})
        }
    
    }
}


export default ProductController