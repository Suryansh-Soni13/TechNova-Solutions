const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Transporter Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // support.technovasolutions@gmail.com
        pass: process.env.EMAIL_PASS  // Your App Password
    }
});

// Mail Route
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New TechNova Lead: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #00f5ff; border-radius: 10px;">
                <h2 style="color: #00f5ff;">New Project Proposal</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <hr style="border: 1px solid #111;">
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Transmission Interrupted.' });
        }
        console.log('Email sent: ' + info.response);
        res.status(200).json({ success: true, message: 'Proposal Ignited!' });
    });
});

app.listen(PORT, () => {
    console.log(`TechNova AI Server ignited on port ${PORT}`);
});
