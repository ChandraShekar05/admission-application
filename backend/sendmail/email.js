require("dotenv").config()
const express = require("express")
const nodemailer = require("nodemailer")
const router = express.Router()

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

// Define the email sending route
router.get("/", (req, res) => {
    const { emailAddress, fullName } = req.query

    if (!emailAddress || !fullName) {
        return res
            .status(400)
            .json({ error: "Email and full name are required" })
    }

    // Configure the email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emailAddress,
        subject: "Application Received",
        text: `Hello ${fullName},\n\nThank you for enrolling in the course! \nWe’ll be in touch soon with more details.\n\nBest regards,\nLisan AI Gaib Academy`,
    }

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error)
            return res.status(500).json({ error: "Failed to send email" })
        }
        console.log("Email sent: " + info.response)
        res.status(200).json({ message: "Email sent successfully" })
    })
})

module.exports = router
