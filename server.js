const express = require('express');
const app = express();
const port = 8999;

// routes
const testRoute = require('./server/routes/test.route');
const projects = require('./server/routes/projects.route');

app.use('/test/', testRoute);
app.use('/projects/', projects)

app.listen(port, () => {
  console.log('App listening on port: ' + port)
})