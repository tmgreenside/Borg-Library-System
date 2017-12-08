/* 
 * Project control functions written here
 */

var sql = require('mysql');

exports.findItems = function(req, res) {
    // string builder to create query
    var queryItems = "SELECT * FROM " + req.body.selectType;
    console.log("Something show that this function is being called");
    res.send("Exterminate! Exterminate!");
};