const express = require('express');
const app = express();
const data = require('../data');

app.get('/getAll', (req, res) => {
    res.json(data)
})

module.exports = app;