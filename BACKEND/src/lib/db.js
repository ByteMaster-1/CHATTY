import moongose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB= async ()=>{
    try{
        await moongose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected');
    }catch(err){
        console.error('Error: '+err.message);
        process.exit(1);
    }
}
