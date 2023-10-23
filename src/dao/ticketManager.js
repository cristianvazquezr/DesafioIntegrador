import { ticketModel } from "./models/ticket.model.js";
import userMananger from "./userMananger.js";

const UM=new userMananger()

class ticketManager{
    constructor(){

    }

    async createTicket(purchaseProducts,notPurchaseProducts,idClient){
        let client= await UM.getUserById(idClient) || null

        if (!client){
            return false
        }
        else{
            const newTicket= await ticketModel.create({purchesedProducts:purchaseProducts,notPurchesedProducts:notPurchaseProducts,client:idClient})
            return newTicket
        }
    }

    async getTicketById(tid){
        const ticket = await ticketModel.findOne({_id:tid}).lean() || null

        if(ticket){
            return await ticket
        }
        else{
            return false
        }
    }

}

export default ticketManager