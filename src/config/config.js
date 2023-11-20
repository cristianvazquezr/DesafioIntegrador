import {Command}  from 'commander';
import dotenv from 'dotenv';

// aplico los comandos de node

const program = new Command()

program.option('--mode <mode>', 'Modo de trabajo', "desarrollo")

program.parse()

console.log(program.opts())

let entorno=program.opts().mode

dotenv.config({
    path: entorno == "desarrollo" ? "./config/.env.devop" : "./config/.env.prod"});

export default{
    port:process.env.PORT,
    mongoURL:process.env.MONGO_URL,
    adminUser:process.env.ADMIN_NAME,
    adminPass:process.env.ADMIN_PASS,
    enviroment:process.env.ENVIROMENT,
    mailingUser:process.env.MAILING_USER,
    mailingService:process.env.MAILING_SERVICE,
    mailingPass:process.env.MAILING_PASS,
}