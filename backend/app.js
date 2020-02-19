//Libraries
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

//server configuration
var basePath = '/';
var port = 6200;


// Connection to DB
mongoose.connect('mongodb://mongodb')
    .then(() => {
      console.log('Backend Started');
    })
    .catch(err => {
        console.error('Backend error:', err.stack);
        process.exit(1);
    });


var app = express();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static('public'));
app.options(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Routes and Backend Functionalities
var routes = require('./src/routes/routes');
app.use(basePath, routes);


app.listen(port, () => {
  console.log('Backend running on Port: ',port);
});
