import mongoose from "mongoose";
import chai from "chai";
import supertest from "supertest";
import ProductManager from "../src/dao/ProductManager.js";

mongoose.connect("mongodb+srv://vazquezcristianr:Cristian123@clustercristian.ggp7vhd.mongodb.net/ecommerce-test?retryWrites=true&w=majority")

const expect = chai.expect

const requester=supertest('http://localhost:8080')

describe('corriendo test wepApp', ()=>{
    describe('testing products API',async()=>{

       let  product={
        title:'title',
        description:'description',
        price:100,thumbnail:'thumbnail',
        code:4,
        stock:180,
        category:'category',
        owner:'premium'}

        it('crear productos: api post debe crear un producto', async()=>{
            
            const {statusCode,ok,_body}= await requester.post('/api/products/').send(product)
            expect(statusCode).is.eqls(200)
            expect(_body.status).is.eqls('OK')
        }).timeout(10000)

        it('crear productos: api post debe arrojar error si se repite el code', async()=>{
            
            const {statusCode,ok,_body}= await requester.post('/api/products/').send(product)
            expect(statusCode).is.eqls(400)
            expect(_body.status).is.eqls('error')
            expect(_body.message).is.eqls("ya existe producto con ese code")
        }).timeout(10000)



        it('Get producto: api get debe obtener todos los productos', async()=>{
            const {statusCode,ok,_body}= await requester.get(`/api/products/`)
            expect(statusCode).is.eqls(200)
            expect(_body.payLoad[0]).is.ok.and.to.have.property("_id")
        }).timeout(10000)
       
    })
})