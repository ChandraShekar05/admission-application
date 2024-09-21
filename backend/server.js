const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint)
// handler for error handling during requests
app.use(middleware.errorHandler)

module.exports = app