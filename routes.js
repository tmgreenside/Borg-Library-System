var crypto = require('crypto');
var express = require('express');
var sql = require('mysql');

var dbConfig = {
    server:'localhost',
    database:'tgreenside_DB',
    user:'trevapp',
    password:'bowers321',
    port:3306,
    multipleStatements: true // overrides a protective measure
};

// additional control and query functions
var controller = require('./controllers/controller');

// send 404 response:
function send404Response(res){
    res.render('error.html');
};

module.exports = function(app) {
	
    app.use('/static', express.static('./static'));
    app.get('/', function (req, res) {
        res.render('home.html', {results: null, parameter: "Welcome to Hogwarts!"});
    });
    
    app.get('/showSomething', function(req, res) {
        res.send("This is something. Here's a random page!");
    });
    
    // app.post('/', controller.findItems);
    app.post('/', function(req, res) {
        var con = sql.createConnection(dbConfig);
        
        con.connect(function(err) {
            if (err) throw err;
            testquery = 'SELECT * FROM Book';
            var itemType = req.body.selectType;
            var searchQuery;
            var dataAttrs;
            
            // switch statements will construct searchQuery which will be sent
            // to database
            switch(itemType) {
                case "Book":
                    var searchBy = req.body.selectBookAttr;
                    break;
                case "Film":
                    var searchBy = req.body.selectFilmAttr;
                    break;
                case "Audio":
                    var searchBy = req.body.selectAudioAttr;
                    break;
            }
            con.query(testquery, function (err, result) {
                if (err) res.send("We have an error! Must refresh.\n" + err);
                else {
                    res.render('home.html', {results: result});
                }
            });
        });
    });
};