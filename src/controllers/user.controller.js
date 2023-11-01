import userMananger from "../dao/userMananger.js";
import {generateToken} from '../utils.js'
import CustomError from "../services/errors/CustomErrors.js";
import { generateUserErrorInfo } from "../services/messages/messages.js";
import EErrors from "../services/errors/enums.js";

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
    current=async (req,res)=>{
        let User=await this.UM.getUserById(req.user._id)
        req.user=User
        delete req.user.password
        delete req.user.__v
        console.log(req.user)
        res.send({status:'success', datos:req.user})
    }

    loginGitHub=async(req, res)=>{
        delete req.user.password
        delete req.user.__v
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
    registrationWithHandleError=async (req, resp)=>{
        let{first_name,last_name, email, age, role}=req.body
        let searchedUser=await userModel.findOne({email:username})
        //aplico el custom error para sguimiento de errores
        if (!first_name || !last_name || !email || !age || !role){
            CustomError.createError({
                name:"user creation error",
                cause:generateUserErrorInfo({first_name,last_name, email, age}),
                code:EErrors.INVALID_TYPES_ERROR
            }
            )
        }else if(!searchedUser){
            CustomError.createError({
                name:"searched User error",
                cause:searchedUserErrorInfo({first_name,last_name, email, age}),
                code:EErrors.INVALID_TYPES_ERROR
            })
        }

        try{
            let user=await userModel.findOne({email:username})
            if(user){
                console.log("ya existe el usuario")
                return done(null, false)
            }
            const newUser={
                first_name,
                last_name,
                email,
                age,
                password:createHash(password),
                role,
                cart:[]
            }
            let result=await userModel.create(newUser)
            return done(null,result)
        }catch (error){
            return done("error al obtener el usuario: " + error)
        }
    

    }

    register=async (req, res)=>{
        const access_token=generateToken(req.user)
        res.send({status:"success", access_token})
    }

    logout=async(req,res)=>{
        req.session.destroy()
        // let delete_cookie = async function(name) {
        //     document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // }
        // await delete_cookie ("connect.sid")
        // await delete_cookie ("cookieEcommerce")
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

    addCart=async (req,resp)=>{
        const user=req.params.email
        const cid=req.params.cid
        const agregarCart = await this.UM.addCart(cid,user)
    
        if((await agregarCart=='cartAgregado')){
            resp.send("se agrego el carrito correctamente")
        }else if(await agregarCart=="invalidUser"){
            resp.status(500).send({status:'error', message:"no se encontro el usuario con ese id"})
        }else{
            resp.status(500).send({status:'error', message:"no se encontro el carrito con ese id"})
        } 
    }
}

export default userController