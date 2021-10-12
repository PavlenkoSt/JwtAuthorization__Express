require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router/index');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

const start = async () => {
    try{
        await mongoose.connect(`mongodb+srv://admin:admin@cluster0.c4817.mongodb.net/jwt-auth?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()