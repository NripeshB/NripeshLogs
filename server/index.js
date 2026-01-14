const config = require('./utils/config.js')
const app = require('./app.js')

app.listen(config.PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${config.PORT} (host: 0.0.0.0)`)
})
