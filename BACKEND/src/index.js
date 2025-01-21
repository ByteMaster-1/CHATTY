//chat application
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { app,server } from './lib/socket.js';
import path from 'path';
app.use(express.json({limit:"30mb"}));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
// Load environment variables from a .env file if present
import dotenv from 'dotenv';
import {connectDB} from './lib/db.js';
dotenv.config();
const port=process.env.PORT ;
const __dirname=path.resolve();



app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'../FRONTEND/dist')));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'../FRONTEND/dist/index.html'));
    });
}
server.listen(port,()=>{
    console.log('Server is running on port '+port);
    connectDB();
})




