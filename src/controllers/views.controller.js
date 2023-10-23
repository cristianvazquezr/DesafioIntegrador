import ProductManager from "../dao/ProductManager.js"
import cartManager from "../dao/cartManager.js"
import ticketManager from "../dao/ticketManager.js"

class viewsController{
    constructor(){
    //instancio la clase Productmanager y cart
    this.PM = new ProductManager()
    this.CM = new cartManager()
    this.TM= new ticketManager()
    }
    home = async (req,resp)=>{
        resp.render("home",{
            style:"style.css"
        })
    }
    products = async (req,resp)=>{

        let userLogged=req.user.first_name   
        let productos=await this.PM.getProducts(req.query)
        resp.render("products",{
            product:productos,
            user:userLogged,
            style:"../../css/style.css",
        })
    }
    realTimeProducts = async (req,resp)=>{

        let userLogged=req.user.first_name
    
        resp.render("realTimeProducts",{
            user:userLogged,
            style:"style.css"
        })
    }

    chat = async (req,resp)=>{

        let userLogged=req.user.first_name
    
        resp.render("chat",{
            user:userLogged,
            style:"../../css/style.css"
        })
    }
    cart = async (req,resp)=>{

        let userLogged=req.user.first_name
        let cid=req.params.cid
        let respuesta=await this.CM.getCartById(cid)
        resp.render("cartId",{
            user:userLogged,
            productos:respuesta[0].products,
            style:"../../css/style.css",
        })
    }
    login=async (req,resp)=>{
        resp.render("login",{
            style:"../../css/style.css"
        })
    }
    register=async (req,resp)=>{
        resp.render("register",{
            style:"../../css/style.css"
        })
    }
    profile=async (req,resp)=>{

        let userLogged=req.user.first_name
    
        resp.render("profile",{
            user:userLogged,
            style:"../../css/style.css"
        })
    }

    restore=async (req,resp)=>{
        resp.render("restore",{
            style:"../../css/style.css"
        })
    }

    purchase = async (req,resp)=>{

        let nameLogged=req.user.first_name
        let lastNameLogged=req.user.last_name
        console.log(req.user)
        let tid=req.params.tid
        let respuesta=await this.TM.getTicketById(tid)
        console.log(respuesta)
        resp.render("ticket",{
            nameClient:nameLogged,
            lastNameCLient:lastNameLogged,
            idBuy:tid,
            productos:respuesta.purchesedProducts,
            sinStock:respuesta.notPurchesedProducts,
            style:"../../css/style.css",
        })
    }

}

export default viewsController