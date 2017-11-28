var crypto = require('crypto');
var express = require('express');
var sql = require('mysql');

// configuration for database
var dbConfig = {
    server:'localhost',
    database:'personal',
    user:'root',
    password:'tempcbsql',
    port:3306,
    multipleStatements: true // overrides a protective measure
};

// send 404 response:
function send404Response(res){
    res.render('error.html');
};

module.exports = function(app) {
	
    app.use('/static', express.static('./static'));
    app.get('/', function (req, res) {
        res.render('home.html');
    });
    
    app.get('/showSomething', function(req, res) {
        res.send("This is something. Here's a random page!");
    });
    
    app.post('/', function(req, res) {
        var con = sql.createConnection(dbConfig);
        
        con.connect(function(err) {
            if (err) throw err;
            var userName = req.body.usernameEntry;
            var userPassEnter = req.body.userPass;
            //var queryUsers = "SELECT * FROM Users";
            queryUsers = 'SELECT * FROM Users WHERE username ="' + userName + '"';
            //queryTemp = 'SELECT * FROM Users WHERE username = "Trevor"; DROP TABLE IF EXISTS showHenadz';
            console.log(queryUsers);
            con.query(queryUsers, function (err, result) {
                if (err) throw err;
                var authenticated = false;
                for (var i = 0; i < result.length; i++) {
                    if(result[i].userpass === userPassEnter) {
                        authenticated = true;
                    }
                }
                if(authenticated)
                    res.send("You will be authenticated! Authenticate! Authenticate!");
                else
                    res.send("Intruder! Exterminate! Exterminate!");
            });
        });
    });
};