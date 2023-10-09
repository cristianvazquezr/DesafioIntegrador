import dotenv from 'dotenv';


dotenv.config();

export default{
    port:process.env.PORT,
    mongoURL:process.env.MONGO_URL,
    adminUser:process.env.ADMIN_NAME,
    adminPass:process.env.ADMIN_PASS

}