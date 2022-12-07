//required pkgs
const express = require('express');
const mongoose = require('mongoose');
const { config } = require('dotenv');

//import route
const mainRoute = require('./router')


//required data from .env
config();
const { PORT: port, MONGO_URI_USER: user, MONGO_URI_PASSWORD: pswd, MONGO_URI_CLUSTER: cluster } = process.env

//mongoDb connect
const url = `mongodb+srv://${user}:${pswd}@${cluster}.avbyndu.mongodb.net/newDB`
mongoose.set('strictQuery', true);
mongoose.connect(url).then( ()=>console.log('mongoDB connected!'), (error)=>console.log(error.message) )

//express init
const app = express()

//request body data parsing into json
app.use(express.json())

app.use('/api', mainRoute )


//create server listener
app.listen( ( port || 3000 ), () => console.log( 'server listeing on port '+ ( port || 3000 ) ));

