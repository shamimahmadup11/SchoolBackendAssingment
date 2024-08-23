const express=require("express")
const mongoose = require('mongoose');
const router=require("./Rout/school")
const dotenv=require("dotenv")
const app=express()
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());

app.use(router)

app.listen(process.env.PORT , ()=>{
    console.log("server is running on port 3000")
})