const express = require('express');
const router = express.Router();
const token = require('../middlewares/token');
const study = require('../models/study');

router.post('/insert', [token], async (req, res) => {
    await study.insertStudies({
        "study": req.body.study,
        "year": req.body.year
    });
    try {
        res.send("<script>alert('Diplôme ajouté !'); window.location.href = '/admin';</script>");
    } catch(err) {
        res.send("<script>alert(" + err.message + "); window.location.href = '/admin';</script>");
        console.log(err.message);
    }
});

router.put('/update/:id', [token], async (req, res) => {
    await study.updateStudies(req.params.id, {
        "study": req.body.study,
        "year": req.body.year
    });
    try {
        res.send("<script>alert('Diplôme modifié !'); window.location.href = '/edit';</script>");
    } catch(err) {
        res.send("<script>alert(" + err.message + "); window.location.href = '/certificate/edit/" + req.body.id + "';</script>");
        console.log(err.message);
    }
});

router.delete('/delete/:id', [token], async (req, res) => {
    await study.deleteStudies(req.params.id);
    try {
        res.send("<script>alert('Diplôme supprimé !'); window.location.href = '/edit';</script>");
    } catch(err) {
        res.send("<script>alert(" + err.message + "); window.location.href = '/edit';</script>");
        console.log(err.message);
    }
});

module.exports = router;
