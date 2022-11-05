require('dotenv').config();
const express = require('express');
const router = express.Router();
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha(process.env.SITE_KEY, process.env.SECRET_KEY);
const token = require('../middlewares/token');
const account = require('../models/account');
const study = require('../models/study');
const skill = require('../models/skill');
const project = require('../models/project');

// router.get('*', async (req, res) => {
//     res.redirect('https://' + req.headers.host + req.url);
// });

router.get('/', async (req, res) => {
    const studies = await study.selectStudies();
    const skills = await skill.selectSkills();
    const projects = await project.selectProjects();
    res.render('index', {
        title: 'Accueil',
        studies: studies,
        skills: skills,
        projects: projects
    });
});

router.get('/contact', async (req, res) => {
    res.render('contact', {
        title: 'Contact'
    });
});

router.get('/login', async (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});

router.get('/admin', [token], async (req, res) => {
    res.render('admin', {
        title: 'Admin'
    });
});

router.get('/profile', [token], async (req, res) => {
    const profile = await account.selectAccount(req.user.id);
    res.render('profile', {
        title: 'Profile',
        profile: profile
    });
});

router.get('/edit', [token], async (req, res) => {
    const studies = await study.selectStudies();
    const skills = await skill.selectSkills();
    const projects = await project.selectProjects();
    res.render('edit', {
        title: 'Édition',
        studies: studies,
        skills: skills,
        projects: projects
    })
});

router.get('/study/edit/:id', [token], async (req, res) => {
    const studies = await study.selectOneStudy(req.params.id);
    res.render('editStudy', {
        title: 'Etudes',
        id: req.params.id,
        studies: studies
    });
});

router.get('/skill/edit/:id', [token], async (req, res) => {
    const skills = await skill.selectOneSkill(req.params.id);
    res.render('editSkill', {
        title: 'Compétence',
        id: req.params.id,
        skills: skills
    });
});

router.get('/project/edit/:id', [token], async (req, res) => {
    const projects = await project.selectOneProject(req.params.id);
    res.render('editProject', {
        title: 'Projet',
        id: req.params.id,
        projects: projects
    });
});

// router.get('/forum', async (req, res) => {

// });

router.get('/404', async (req, res) => {
    res.render('404', {
        title: '404'
    });
});

router.get('*', async (req, res) => {
    res.redirect('/404');
});

module.exports = router;