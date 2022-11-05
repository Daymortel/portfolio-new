const express = require('express');
const router = express.Router();
const token = require('../middlewares/token');
const skill = require('../models/skill');

router.post('/insert', [token], async (req, res) => {
    await skill.insertSkills({
        "skill": req.body.skill,
        "percent": req.body.percent
    });
    try {
        res.send("<script>alert('Compétence ajoutée !'); window.location.href = '/admin';</script>");
    } catch(err) {
        res.send("<script>alert(" + err.message + "); window.location.href = '/admin';</script>");
        console.log(err.message);
    }
});

router.put('/update/:id', [token], async (req, res) => {
    await skill.updateSkills(req.params.id, {
        "skill": req.body.skill,
        "percent": req.body.percent
    });
    try {
        res.send("<script>alert('Compétence modifiée !'); window.location.href = '/edit';</script>");
    } catch(err) {
        res.send("<script>alert(" + err.message + "); window.location.href = '/skill/edit/" + req.body.id + "';</script>");
        console.log(err.message);
    }
});

router.delete('/delete/:id', [token], async (req, res) => {
    await skill.deleteSkills(req.params.id);
    try {
        res.send("<script>alert('Compétence supprimée !'); window.location.href = '/edit';</script>");
    } catch(err) {
        res.send("<script>alert(" + err.message + "); window.location.href = '/edit';</script>");
        console.log(err.message);
    }
});

module.exports = router;
