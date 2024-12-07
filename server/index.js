import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js'
dotenv.config({});
const app = express();


//default middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));


//apis
app.use("/api/v1/user", userRoute);


const PORT = process.env.PORT || 8000 ;
app.listen(PORT, () => {
    connectDb();
    console.log(`Server Running on port ${PORT}`);
  });