import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        unique:true
    },
    age:Number,
    password:String,
    role:{
        type:String,
        default:"user",
        enum:['user','admin']
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'carts'
    }

})

export const userModel=mongoose.model("users", userSchema)