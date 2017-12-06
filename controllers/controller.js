/* 
 * Project control functions written here
 */

var sql = require('mysql');

exports.findItems = function(req, res, con) {
    // string builder to create query
    var queryItems = "SELECT * FROM " + req.body.selectType;
    console.log("Something show that this function is being called");
    res.send("Exterminate! Exterminate!");
    con.query(queryItems, function (err, result) {
        if (err) throw err;
        
        // TODO: what to do
    });
};