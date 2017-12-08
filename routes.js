var crypto = require('crypto');
var express = require('express');
var sql = require('mysql');

// additional control and query functions
var controller = require('./controllers/controller');

// configuration for database
var dbConfig = {
    server:'localhost',
    database:'personal',
    user:'tgreenside',
    password:'bowers321',
    port:3306,
    multipleStatements: true // overrides a protective measure
};

// connection to the SQL database
const con = sql.createConnection(dbConfig);
con.connect();

// send 404 response:
function send404Response(res){
    res.render('error.html');
};

module.exports = function(app) {
	
    app.use('/static', express.static('./static'));
    app.get('/', function (req, res) {
        console.log(req.session.username);
        res.render('home.html');
    });
    
    app.get('/showSomething', function(req, res) {
        res.send("This is something. Here's a random page!");
    });
    
    app.post('/', controller.findItems);
};