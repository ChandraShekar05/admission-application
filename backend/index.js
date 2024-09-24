const app = require('./server')
const logger = require('./utils/logger')
const config = require('./utils/config')
require('dotenv').config();

app.listen(config.PORT,() => {
    logger.info(`Server running on port ${config.PORT}`)
})