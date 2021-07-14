const express = require('express');
const app = express();
const port = 8999;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = mongoose.connection;
const MONGODB_URI = 'mongodb://localhost:27017/timesheets';

app.use(bodyParser.json());

// db
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('DB is connected');
})

// routes
const projects = require('./server/routes/projects.route');
const users = require('./server/routes/user.route');
app.use('/projects/', projects);
app.use('/users/', users);

app.listen(port, () => {
  console.log('App listening on port: ' + port)
})