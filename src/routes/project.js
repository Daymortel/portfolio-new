const express = require('express');
const router = express.Router();
const path = require('path');
const project = require('../models/project');
const token = require('../middlewares/token');
const upload = require('../middlewares/upload');
const Resize = require('../middlewares/resize');

router.post('/insert', upload.single('image'), [token], async (req, res) => {
    const imagePath = path.join(__dirname, '../../public/imgs/projects');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
      res.status(401).json({error: 'S\'il vous plaît sélectionnez une image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    await project.insertProjects({
        "project": req.body.project,
        "link": req.body.link,
        "image": filename

    });
    try {
        res.send("<script>alert('Projet ajouté !'); window.location.href = '/admin';</script>");
    } catch(err) {
        res.send("<script>alert(" + err.message + "); window.location.href = '/admin';</script>");
        console.log(err.message);
    }
});

router.put('/update/:id', upload.single('image'), [token], async (req, res) => {
    const imagePath = path.join(__dirname, '../../public/imgs/projects');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
      res.status(401).json({error: 'S\'il vous plaît sélectionnez une image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    await project.updateProjects(req.params.id, {
        "project": req.body.project,
        "link": req.body.link,
        "image": filename
    });
    try {
        res.send("<script>alert('Compétence modifiée !'); window.location.href = '/edit';</script>");
    } catch(err) {
        res.send("<script>alert(" + err.message + "); window.location.href = '/project/edit/" + req.body.id + "';</script>");
        console.log(err.message);
    }
});

router.delete('/delete/:id', [token], async (req, res) => {
    await project.deleteProjects(req.params.id);
    try {
        res.send("<script>alert('Projet supprimé !'); window.location.href = '/edit';</script>");
    } catch(err) {
        res.send("<script>alert(" + err.message + "); window.location.href = '/edit';</script>");
        console.log(err.message);
    }
});

module.exports = router;
