var crypto = require('crypto');
var express = require('express');
var sql = require('mysql');

// additional control and query functions
var controller = require('./controllers/controller');

// send 404 response:
function send404Response(res){
    res.render('error.html');
};

module.exports = function(app) {
	
    app.use('/static', express.static('./static'));
    app.get('/', function (req, res) {
        res.render('home.html', {result: ""});
    });
    
    app.get('/showSomething', function(req, res) {
        res.send("This is something. Here's a random page!");
    });
    
    app.post('/', controller.findItems);
};