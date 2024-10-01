const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const applicantRouter = require("./controllers/applicants")
const courseRouter = require("./controllers/courses")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const config = require("./utils/config")
const mailRouter = require("./sendMail/mail")
const router = require("./sendMail/email")
const adminRouter = require("./controllers/admin")
// const { adminAuthentication } = require('./utils/middleware')

// mongoose.set("strictQuery", false)

logger.info("connecting to", config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("connected to MongoDB")
    })
    .catch((error) => {
        console.log(error)
        logger.error("error connection to MongoDB:", error.message)
    })

app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your frontend URL
        credentials: true,
    })
)
app.use(express.json())
app.use(cookieParser())
// app.use(adminAuthentication)d

app.use("/api/applications", applicantRouter)
app.use("/api/courses", courseRouter)
app.use("/api/mail", mailRouter)
app.use("/api/send-email", router)
app.use("/api/admin", adminRouter)

// handler for error handling during requests
app.use(middleware.errorHandler)

module.exports = app
