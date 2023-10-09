import ProductManager from "../dao/ProductManager.js";

class ProductController{
    constructor(){
        this.PM= new ProductManager();
    }
    getProducts = async (req,resp)=>{
        let productos=await this.PM.getProducts(req.query)
        
    
        resp.send(productos)
    }

    getProductById = async (req,resp)=>{
        let pid=req.params.pid
    
        if((pid==undefined)){
            resp.send(await this.PM.getProducts())
        }else{
            let respuesta=await this.PM.getProductById(pid)
            if(respuesta==false){
                resp.send("no existe el id")
            }else{
                resp.send(await this.PM.getProductById(pid))
            } 
        }  
    }
    addProduct= async (req,resp)=>{
    
        let {title, description, category, price, thumbnail, code, stock}=req.body
        
    
        let productos=await this.PM.addProduct(title, description, category, price, thumbnail, code, stock)
       
        if(productos=="valorVacio"){
            resp.status(400).send({status:"error", message:"complete los campos obligatorios"})
        }else if(productos=="codeRepetido"){
            
            resp.status(400).send({status:"error", message:"ya existe producto con ese code"})
        } else{
            resp.status(200).send("se agrego correctamente")
        }
    }

    updateProduct = async (req,resp)=>{
        const id = req.params.pid
        let {title, description, category, price, thumbnail, code, stock}=req.body
        
    
        let productos=await this.PM.updateProduct(id,title, description, category, price, thumbnail, code, stock)
       
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
    
        let productos=await this.PM.deleteProduct(id)
       
        if(productos){
            resp.status(200).send("se elimino el producto correctamente")
    
        }else{
            resp.status(400).send({status:"error", message:"no se encontro el elemento"})
        }
    
    }
}


export default ProductController