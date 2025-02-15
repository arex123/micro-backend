import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config()

connectDB()
const app = express()
app.use(cors());  

import router from './routes/routes.js'
import connectDB from './config/database.js'

app.use(bodyParser.json());

app.use("/api",router)


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server is running on port  ",PORT)
})