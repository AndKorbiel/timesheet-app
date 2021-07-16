require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8999;
const path = require('path');

const db = mongoose.connection;
const user = process.env.DB_USER;
const pass = process.env.DB_PASSWORD;

const MONGODB_URI =  `mongodb+srv://${user}:${pass}@node-test.cotft.mongodb.net/timesheets?retryWrites=true&w=majority`;

app.use(bodyParser.json());

// db
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('DB is connected');
})

// routes
const projects = require('./server/routes/projects.route');
const users = require('./server/routes/user.route');
app.use('/projects/', projects);
app.use('/users/', users);

// production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log('App listening on port: ' + port)
})