require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router/index');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = async () => {
    try{
        await mongoose.connect(process.env.DB_URL);
        app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()