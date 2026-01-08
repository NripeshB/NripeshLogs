const authRoutes = require('./routes/authroutes.js')
const blogRoutes = require('./routes/blogroutes.js')
const articleRoutes = require('./routes/articleroutes.js')
const commentRoutes = require('./routes/commentroutes.js')
const usersRoutes = require('./routes/usersroutes.js')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config.js')

// using express as app
const app = express()
// allowing cross origin access (giving access to the client )
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
// connecting to the 
mongoose
    .connect(config.MONGODB_URI)
    .then(()=>
    {
        console.log('Connected to Mongodb.');
    })
    .catch((error)=>{
        console.error("The MongoDb connection had an error: ", error.message);
        
    })
// All the routes 

app.use('/api/auth', authRoutes)
app.use('/api/blogs',blogRoutes )
app.use('/api/articles',articleRoutes )
app.use('/api/comments', commentRoutes)
app.use('/api/users', usersRoutes)

// checks if the connection is correct or not 
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