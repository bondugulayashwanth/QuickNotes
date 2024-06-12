const cors=require('cors');
const express=require('express');
const connectToMongo= require('./db');
const app=express();
const dotenv= require('dotenv');
dotenv.config();
connectToMongo();


app.use(express.json());
app.use(cors());

//These are routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

const Port=  process.env.PORT
app.listen(process.env.PORT,()=>{
    console.log(`connected to port  ${Port}`)
});