const express = require('express');
const app = express();
const User = require('../models/user.model');

app.post('/login', (req, res) => {
    const { name, password } = req.body;

    User.findOne({name: name}, (err, result) =>{
        if (err) {
            res.status(500).json({isSuccess: false, loginMessage: 'Server error'})
        } else if (result) {
            if (result.password === password) {
                res.status(200).json({isSuccess: true, loginMessage: 'You are logged in'})
            } else {
                res.status(500).json({isSuccess: false, loginMessage: 'Wrong password'})
            }
        } else {
            res.status(500).json({isSuccess: false, loginMessage: 'Wrong user name'})
        }
    })
})

module.exports = app;