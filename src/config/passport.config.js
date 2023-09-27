import passport from "passport";
import local from "passport-local";
import { userModel } from "../dao/models/user.model.js";
import { createHash } from "../utils.js";
import { isValidPassword } from "../utils.js";
import userMananger from "../dao/userMananger.js";
import GitHubStategy from 'passport-github2'
import jwt from "passport-jwt";


let UM = new userMananger()

const localStrategy=local.Strategy;
const JWTStrategy=jwt.Strategy
const extractJWT=jwt.ExtractJwt

const cookieExtractor=(req)=>{
    let token=null
    if(req && req.cookies){
        token=req.cookies['cookieEcommerce']
    }
    return token
}

const initiliazePassport=()=>{

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest:extractJWT.fromExtractors([cookieExtractor]),
        secretOrKey:'secr3to',
    }, async (jwt_payload, done)=>{
        try{
            return done(null, jwt_payload)
        }catch(err){
            return done(err)
        }
    }))

    passport.use('github', new GitHubStategy({
        clientID:"Iv1.8d648f50938bf4fe",
        clientSecret:"deecea5c36e82645e420a480dda1c132725aba7e",
        callBackURL: 'http://localhost:8080/api/session/githubCallBack'
    }, async (accessToken, refreshToken,profile,done)=>{
        try{
            console.log(profile)
            let user=await userModel.findOne({email:profile._json.email})
            if(!user){
                let newUser={
                    first_name:profile._json.name,
                    last_name:"",
                    age:"",
                    email:profile._json.email,
                    password:'',
                    admin:false
                }
                let result=await userModel.create(newUser)
               return done(null, result)
            }else{
                return done(null, user)
            }
        }catch(err){
            return done(err)
        }
    }))

    passport.use('register',new localStrategy(
        {passReqToCallback:true,usernameField:"email"},async (req,username,password,done)=>{
            let{first_name,last_name, email, age, role}=req.body
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
                }
                let result=await userModel.create(newUser)
                return done(null,result)
            }catch (error){
                return done("error al obtener el usuario: " + error)
            }
        }
    ))

      
    passport.use('login', new localStrategy(
        {usernameField:'email'}, async (username, password, done)=>{
        try{
            const user = await userModel.findOne({email:username})
            if(!user){
                console.log('el usuario elegido no existe')
                return done(null, false)
            }
            if(!isValidPassword(user,password)) return done (null, false);
            return done(null, user)
        }catch(err){
            return done(err);
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null,user._id)
    })
    
    
    passport.deserializeUser(async (id,done)=>{
        let user = await userModel.findById(id);
        done(null,user)
    })
    
}




export default initiliazePassport;