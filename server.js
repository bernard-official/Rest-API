require("dotenv").config()

const express = require ("express");
const { default: mongoose } = require("mongoose");
const app = express()

//work on the connection with mongoAtlas
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',()=>console.log('connected to database'))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers.js')
app.use('/subscribers/', subscribersRouter)

app.listen(3000, ()=> console.log("Server Started"));