const express = require('express');
const app = express();
const Project = require('../models/project.model');

app.get('/get', (req, res) => {
    Project.find((err, projects) => {
        if (err) {
            res.send('Error while getting data from database')
        } else {
            res.send(projects)
        }
    })
})

app.post('/add', (req, res) => {
    const newProject = new Project({
        title: req.body.title,
        description: req.body.description
    })
    newProject.save()
        .then(()=> {res.status(200).send(newProject)})
        .catch(err => res.status(500).send(err))
})

app.get('/remove', (req, res) => {
    const id = req.query.id
    Project.findByIdAndRemove(id)
        .then(() => res.status(200).json(id))
        .catch(err => res.status(500).send(err))
})

module.exports = app;