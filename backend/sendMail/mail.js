// const express = require('express');
// const nodemailer = require('nodemailer');
// const router = express.Router();
// require('dotenv').config();

// const transporter = nodemailer.createTransport({
//     service: 'Gmail', 
//     auth: {
//         user: process.env.EMAIL_USER, 
//         pass: process.env.EMAIL_PASS,
//     },
// });



// // Define the email sending route
// router.post('/send-email', (req, res) => {
//     const { email, fullName } = req.body;

//     if (!email || !fullName) {
//         return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // Configure the email options
//     const mailOptions = {
//         from: 'kalvakunta.cshekar0510@gmail.com',
//         to: email,
//         subject: 'Application Received',
//         text: `Hello ${fullName},\n\nThank you for enrolling for the course! \nWe’ll be in touch soon with more details.\n\nBest regards,\nLisan AI Gaib Academy`,
//     };

//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error);
//             return res.status(500).json({ error: 'Failed to send email' });
//         }
//         res.status(200).json({ message: 'Email sent successfully' });
//     });
// });

// module.exports = router;

const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = (email, fullName, status) => {
    let text;
    switch (status.toLowerCase()) {
        case 'open':
            text = `Hello ${fullName},\n\nThank you for enrolling for the course! \nWe’ll be in touch soon with more details.\n\nBest regards,\nLisan AI Gaib Academy`;
            break;
        case 'followup':
            text = `Hello ${fullName},\n\nWe are following up on your application. Please provide the necessary documents.\n\nBest regards,\nLisan AI Gaib Academy`;
            break;
        case 'mail sent':
            text = `Hello ${fullName},\n\nWe have sent you an email with further instructions. Please check your inbox.\n\nBest regards,\nLisan AI Gaib Academy`;
            break;
        case 'accepted':
            text = `Hello ${fullName},\n\nCongratulations! Your application has been accepted. We will contact you with the next steps.\n\nBest regards,\nLisan AI Gaib Academy`;
            break;
        case 'rejected':
            text = `Hello ${fullName},\n\nWe regret to inform you that your application has been rejected. Thank you for your interest.\n\nBest regards,\nLisan AI Gaib Academy`;
            break;
        default:
            text = `Hello ${fullName},\n\nThank you for your application. We will update you on the status soon.\n\nBest regards,\nLisan AI Gaib Academy`;
            break;
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Application Status Update',
        text: text,
    };

    return transporter.sendMail(mailOptions);
};

// Define the email sending route
router.post('/send-email', async (req, res) => {
    const { email, fullName, status } = req.body;

    if (!email || !fullName || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await sendMail(email, fullName, status);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;