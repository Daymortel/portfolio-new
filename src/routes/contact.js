require('dotenv').config();
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha(process.env.SITE_KEY, process.env.SECRET_KEY);

router.post('/', recaptcha.middleware.verify, async (req, res) => {
    // let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_PASS
        },
    });

    try {
        if (!req.recaptcha.error) {
            await transporter.sendMail({
                // from: req.body.email,
                to: 'dylanbab22@live.fr',
                subject: 'Demande de contact',
                html: `<p>Nom : ${req.body.name}</p>
                <p>Email : ${req.body.email}</p>
                <p>Services : ${req.body.job}</p>
                <p>Titre : ${req.body.title}</p>
                <p>Message : ${req.body.message}</p>
                `
            });
            res.send("<script>alert('Message envoyé !'); window.location.href = '/';</script>");
        } else {
            res.send("<script>alert('Captcha invalide !'); window.location.href = '/';</script>");
            console.log('Recaptcha invalide !');
        }
    } catch (err) {
        console.log(err.message);
        res.send("<script>alert(" + err.message + "); window.location.href = '/';</script>");
    }
});

module.exports = router;