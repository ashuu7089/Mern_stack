require('dotenv').config();
const express = require('express');
const app = express();
require('./src/configs/dbConfig')

const cors = require('cors');

app.use(cors({
    origin: "http://localhost:5173",
    methods:["GET, POST, PATCH, PUT, DELETE"], // Allow frontend access
    credentials: true, // Allow cookies & auth headers
  }));
 app.use(express.json());
const mainRouter = require('./src/routers/mainRouter')
app.use('/api', mainRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on PORT no : ${process.env.PORT}`)
})

