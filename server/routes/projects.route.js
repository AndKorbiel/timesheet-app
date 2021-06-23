const express = require('express');
const app = express();
const Project = require('../models/project.model');

app.get('/getAll', (req, res) => {
    Project.find((err, projects) => {
        if (err) {
            res.send('Error while getting data from database')
        } else {
            res.send(projects)
        }
    })
})

module.exports = app;