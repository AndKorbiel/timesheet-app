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

app.put('/update', (req, res) => {
    const id = req.body._id;
    const updatedProject = {
        title: req.body.title,
        description: req.body.description
    }

    Project.findOneAndUpdate({_id: id}, updatedProject, {new: true}, (err, result) =>{
        if (err) {
            res.status(500).json('Error: ' + err)
        } else {
            res.status(200).send(result)
        }
    })
})

app.put('/send-ts', (req, res) => {
    const id = req.body._id;

    Project.findOneAndUpdate({_id: id}, { $push: { timesheets: req.body.data  } }, {new: true}, (err, result) =>{
        if (err) {
            res.status(500).json('Error: ' + err)
        } else {
            res.status(200).send(result)
        }
    })
})

app.put('/update-ts', (req, res) => {
    const id = req.body._id;
    console.log(req.body.data)

    Project.findOneAndUpdate({_id: id}, { timesheets: req.body.timesheets }, {new: true}, (err, result) =>{
        if (err) {
            res.status(500).json('Error: ' + err)
        } else {
            res.status(200).send(result)
        }
    })
})

module.exports = app;