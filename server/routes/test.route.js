const express = require('express');
const app = express();



app.get('/api', (req, res) => {
    res.json('test message from api')
})

module.exports = app;