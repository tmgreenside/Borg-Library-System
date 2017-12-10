/* 
 * Project control functions written here
 */

var sql = require('mysql');

var dbConfig = {
    server:'localhost',
    database:'personal',
    user:'trevapp',
    password:'bowers321',
    port:3306,
    multipleStatements: true // overrides a protective measure
};

exports.findItems = function(req, res) {
    var con = sql.createConnection(dbConfig);
        
    con.connect(function(err) {
        if (err) throw err;
        testquery = 'SELECT * FROM Book';
        con.query(testquery, function (err, result) {
            if (err) res.send("We have an error! Must refresh.\n" + err);
            else {
                req.session.result = result;
                res.render('home.html', {result});
            }
        });
    });
    
    con.end();
};