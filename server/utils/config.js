require('dotenv').config()
// Importing and setting all the env variables to not make usage verbose
const PORT = process.env.PORT

// Setting the Mongodb uri based on the environment of node being used 
// Ensures data from testing database to not clash with the real database 
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI

const SECRET = process.env.SECRET

module.exports = {PORT, MONGODB_URI, SECRET}