const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

const applicantRouter = require("./controllers/applicants")
const courseRouter = require("./controllers/courses")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const config = require("./utils/config")
// const emailRouter = require("./sendmail/email")
const sendEmailRouter = require('./sendmail/email');


mongoose.set("strictQuery", false)

logger.info("connecting to", config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("connected to MongoDB")
    })
    .catch((error) => {
        logger.error("error connection to MongoDB:", error.message)
    })

app.use(cors())
app.use(express.json())

app.use("/api/applications", applicantRouter)
app.use("/api/courses", courseRouter)
app.use('/api', sendEmailRouter);

// handler for error handling during requests
app.use(middleware.errorHandler)

module.exports = app
