const authRoutes = require('./routes/authroutes.js')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config.js')


const app = express()

app.use(express.json())

mongoose
    .connect(config.MONGODB_URI)
    .then(()=>
    {
        console.log('Connected to Mongodb.');
    })
    .catch((error)=>{
        console.error("The MongoDb connection had an error: ", error.message);
        
    })

app.use('/api/auth', authRoutes)

app.get('/api/health', (req,res)=>{
    const dbState = mongoose.connection.readyState

    const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
    }

    res.json({
        server: 'ok',
        database: states[dbState],
    })
})

module.exports = app