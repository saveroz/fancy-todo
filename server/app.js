if(!process.env.NODE_ENV||process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT
const indexRoutes = require('./routes/indexRoutes')
const errorHandler = require('./middleware/errorHandler')
const db_url = process.env.DB_URL

app.use(cors())
app.use(express.urlencoded({extended:false})) 
app.use(express.json())

mongoose.connect(db_url, {useNewUrlParser:true})



app.use('/', indexRoutes)

app.use(errorHandler)

app.listen(port, ()=>{
    console.log("listening to port 3000")
})


