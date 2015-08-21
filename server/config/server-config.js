// Dependencies
var handler = require('./server-requests.js');
var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');

// Initialize express process
var app = express();

// Bind middleware to app instance
app.use(morgan('dev'));
app.use(express.static('./www'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendfile('./www/index.html');
});

app.get('/login', function (req, res) {
  res.send();
});

app.post('/location', handler.getLoc);

app.post('/table', handler.getTable);
app.post('/login', handler.loginUser);
app.post('/signup', handler.signupUser);
app.post('/tabs', handler.toTabs);
app.post('/location', handler.sendLoc);
app.post('/profile', handler.profile);
app.post('/profile/upload', handler.upload);

// Export server app instance
module.exports = app;
