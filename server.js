const express = require('express');
const app = express();
const port = 8999;
const mongoose = require('mongoose');
const db = mongoose.connection;
const MONGODB_URI = 'mongodb://localhost:27017/timesheets';

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('DB is connected');
})

// routes
const testRoute = require('./server/routes/test.route');
const projects = require('./server/routes/projects.route');

app.use('/test/', testRoute);
app.use('/projects/', projects)

app.listen(port, () => {
  console.log('App listening on port: ' + port)
})