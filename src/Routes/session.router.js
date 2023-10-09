import { Router } from "express"
import userController from "../controllers/user.controller.js"
import passport from "passport"
import {passportCall} from '../utils.js'




//isntancio la clase cartManager

const UC = new userController()

const sessionRouter=Router()

//login con passport 
sessionRouter.post('/session/login', passport.authenticate('login'), UC.login)

//current
sessionRouter.get('/session/current',passportCall('jwt'),UC.current)

//login con passport github
sessionRouter.get('/session/github', passport.authenticate('github', {scope:'user:email'}), async(req, res)=>{ })

//login con passport github
sessionRouter.get('/session/githubCallBack', passport.authenticate('github', {failureRedirect:'/session/login'}),UC.loginGitHub )

//registro
// sessionRouter.post('/session/register', async (req,resp)=>{
//     let{first_name,last_name, email, age, password, admin}=req.body
//     let userRegistered=await UM.addUser(first_name,last_name, email, age, password, admin)

//     if(userRegistered=="valorVacio"){
//         resp.status(400).send({status:"error", message:"complete los campos obligatorios"})
//     }else if(userRegistered=="emailRepetido"){
//         resp.status(400).send({status:"error", message:"ya existe un usuario con ese email"})
//     } else{
//         resp.status(200).send({status:"OK", message:"se agrego correctamente"})
//     }
    
// })



//registro con passport
sessionRouter.post('/session/register',passport.authenticate('register'), UC.register)

//logout
sessionRouter.get('/session/logout',UC.logout)

//restore
sessionRouter.post('/session/restore', UC.restore)



export default sessionRouter