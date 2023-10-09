import userMananger from "../dao/userMananger.js";
import {generateToken} from '../utils.js'

class userController {
    constructor(){
        this.UM=new userMananger();
    }
    login=async(req, res)=>{
        if(!req.user) return res.status(400).send({status:"error",message:"credenciales invalidas"})
        delete req.user.password
        const access_token=generateToken(req.user)
        console.log(access_token)
        res.cookie("cookieEcommerce", access_token, {maxAge:3600000, httpOnly:true}).send({status:"success", access_token,datos:req.user})
    }
    current=(req,res)=>{
        res.send({status:'success', datos:req.user})
    }

    loginGitHub=async(req, res)=>{
        console.log(req.user)
        req.session.user={
            fist_name:req.user.first_name,
            last_name:req.user.last_name,
            age:req.user.age,
            email:req.user.email,
            admin:req.user.admin
        }
        const access_token=generateToken(req.user)
        res.cookie("cookieEcommerce", access_token, {maxAge:3600000, httpOnly:true}).redirect('/products')
        
    }

    register=async (req, res)=>{
        const access_token=generateToken(req.user)
        res.send({status:"success", access_token})
    }

    logout=(req,res)=>{
        req.session.destroy();
        res.redirect('/login');
    }

    restore=async (req, resp)=>{
        let {user, pass}=req.query
        let userlogged= await this.UM.restore(user, pass)
        delete userlogged.password
        if(userlogged=="invalidUser"){
    
            resp.status(400).send({status:'ERROR', message:"Usuario incorrecto"})
        }
        else{
            req.session.users = userlogged
            resp.send({status:'OK', message:"Clave modificada exitosamente ", datos:userlogged})
        }
    }
}

export default userController