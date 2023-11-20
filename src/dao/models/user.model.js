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
        enum:['user','admin','premium']
    },

    cart:{
        type:[
            {
                cart:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'carts'
                }
            }
        ]
       
    }

})

userSchema.pre('find',function(){

    this.populate("cart.cart")
    
  })

export const userModel=mongoose.model("users", userSchema)

