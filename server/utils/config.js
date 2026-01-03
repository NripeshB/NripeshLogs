require('dotenv').config()
// importing and setting all the env variables to not make usage verbose
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET

module.exports = {PORT, MONGODB_URI, SECRET}