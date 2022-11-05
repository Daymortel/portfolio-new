require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const joi = require('joi');
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha(process.env.SITE_KEY, process.env.SECRET_KEY);
const account = require('../models/account');
const verifyToken = require('../middlewares/token');

router.post('/signin', recaptcha.middleware.verify, async (req, res) => {
    try {
        const result = await account.login(req.body.email, crypto.createHash('sha256').update(req.body.password).digest('hex'));
        const user = {
            id: result[0].id,
            firstname: result[0].firstname,
            lastname: result[0].lastname,
            email: result[0].email,
            password: result[0].password
        }
        const token = jwt.sign(user, 'secretkey');
        if (!req.recaptcha.error) {
            // res.send({token});
            res.cookie('x-auth-token', token);
            res.redirect('/admin');
        } else {
            res.send("<script>alert('Captcha invalide !'); window.location.href = '/login';</script>");
            console.log('Recaptcha invalide !');
        }
    } catch(err) {
        res.send("<script>alert('Connexion impossible !'); window.location.href = '/login';</script>");
        console.log(err.message);
    }
});

router.post('/signout', async (req, res) => {
    res.clearCookie('x-auth-token');
    res.redirect('/login');
})

router.get('/select', [verifyToken], async (req, res) => {
    const user = await account.selectAccount(req.user.id);
    res.send(user);
});

router.post('/update', [verifyToken], async (req, res) => {
    try {
        const schema = joi.object({
            "email": joi.string(),
            "password": joi.string()
        });
        const validation = schema.validate({
            "email": req.body.email,
            "password": crypto.createHash('sha256').update(req.body.password).digest('hex')
        });
        await account.updateAccount(req.user.id, validation.value);
        res.send("<script>alert('Infos du compte mises à jour !'); window.location.href = '/profile';</script>");
            
    } catch(err) {
        res.send("<script>alert(" + err.message + "); window.location.href = '/profile';</script>");
        // res.redirect('/admin/members');
        console.log(err.message);
    }
});

module.exports = router;