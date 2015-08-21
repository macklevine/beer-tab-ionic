// Dependencies
var handler = require('./server-requests.js');
var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');
var multer = require('multer');

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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'www')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //this works.
  }
});

var upload = multer({ storage: storage });

app.post('/profileupload', upload.single('file'), function(req, res){
  console.log(req.files); // form files
  res.status(204).end();
});


// Export server app instance
module.exports = app;
