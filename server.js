var express = require('express');
var fs = require('fs');
var url = require('url'); 

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
app.engine('.html', require('ejs').__express);
app.set('views',__dirname + '/views');
app.set('view engine','html');
 
app.use(session({
    secret: 'SECRET',
    cookie: {maxAge: 3*60*60*1000},
    saveUninitialized: false,
    resave: true
})); // cookies maxAge = 3 hours

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

require('./routes')(app);

// Start listening for requests
app.listen(8080);