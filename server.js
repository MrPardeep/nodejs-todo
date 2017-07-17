var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();
var config = require('./config');

app.use(morgan('dev')); 					
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());

/*Database connection Coding*/
var dbName = 'dummyDB';
var connectString = 'mongodb://localhost/' + dbName;
mongoose.connect(connectString); 

// Load up the routers
var index = require('./routes/index.js')(app)

app.listen(process.env.PORT || 8080);
console.log('Magic happens on port: %d', process.env.PORT || 8080);