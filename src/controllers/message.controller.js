import { messageModel } from "../dao/models/message.model.js";

class messageController{
    constructor(){
        this.MM = new messageModel()
    }
    getMessage=async (req, resp)=>{
        resp.send(await this.MM.getMessage())
    }
    createMessage=async (req, resp)=>{

        let {usuario, mensaje}=param.body
    
        resp.send(await this.MM.createMessage(usuario, mensaje))
    }
}

export default messageController