import express from 'express'
import UserRoute from './route/UserRoute.js';
import cors from 'cors';
import connectDb from './db/db.js';
import dotenv from "dotenv"
dotenv.config();

connectDb()
const app = express()
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS')); 
    }
  },
};

app.use(cors(corsOptions)); 

app.use(express.json());

app.use('/api/users',UserRoute)

app.listen(5000,()=>{
    console.log('backend working');
    
})