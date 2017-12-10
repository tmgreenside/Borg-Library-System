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
        res.render('home.html', {results: null, attrs: [] });
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
            var dataAttrs = [];
            
            // switch statements will construct searchQuery which will be sent
            // to database
            switch(itemType) {
                case "Book":
                    var searchBy = req.body.selectBookAttr;
                    switch(searchBy) {
                        case "Author":
                            searchQuery = "SELECT a.authorName, b.title, lb.branchName, COUNT(i.inventory_id) AS NUM_COPIES FROM (LibraryBranch lb JOIN Inventory i USING (branchID) JOIN Book b ON b.ISBN = i.copy_id) JOIN AuthorCredits a USING (ISBN) WHERE a.authorName = '" + req.body.parameterEntry + "' GROUP BY a.authorName, b.title, lb.branchName ORDER BY NUM_COPIES DESC;";
                            dataAttrs = ["authorName", "title", "branchName", "NUM_COPIES"];
                            break;
                        case "Title":
                            searchQuery = "SELECT a.authorName, b.title, lb.branchName, COUNT(i.inventory_id) AS NUM_COPIES FROM (LibraryBranch lb JOIN Inventory i USING (branchID) JOIN Book b ON b.ISBN = i.copy_id) JOIN AuthorCredits a USING (ISBN) WHERE b.title = '" + req.body.parameterEntry + "' GROUP BY a.authorName, b.title, lb.branchName ORDER BY NUM_COPIES DESC;";
                            dataAttrs = ["authorName", "title", "branchName", "NUM_COPIES"];
                            break;
                    }
                    break;
                case "Film":
                    var searchBy = req.body.selectFilmAttr;
                    switch(searchBy) {
                        case "Title":
                            searchQuery = "SELECT d.directorName, f.title, lb.branchName, COUNT(i.inventory_id) AS NUM_COPIES FROM (LibraryBranch lb JOIN Inventory i USING (branchID) JOIN Film f ON f.filmID = i.copy_id) JOIN DirectorCredits d USING (filmID) WHERE f.title = '" + req.body.parameterEntry + "' GROUP BY d.directorName, f.title, lb.branchName ORDER BY NUM_COPIES DESC;";
                            dataAttrs = ["directorName", "title", "branchName", "NUM_COPIES"];
                            break;
                        case "Director":
                            searchQuery = "SELECT d.directorName, f.title, lb.branchName, COUNT(i.inventory_id) AS NUM_COPIES FROM (LibraryBranch lb JOIN Inventory i USING (branchID) JOIN Film f ON f.filmID = i.copy_id) JOIN DirectorCredits d USING (filmID) WHERE d.directorName = '" + req.body.parameterEntry + "' GROUP BY d.directorName, f.title, lb.branchName ORDER BY NUM_COPIES DESC;";
                            dataAttrs = ["directorName", "title", "branchName", "NUM_COPIES"];
                            break;
                    }
                    break;
                case "Audio":
                    var searchBy = req.body.selectAudioAttr;
                    switch(searchBy) {
                        case "Title":
                            searchQuery = "SELECT a.artistName, ad.title, lb.branchName, COUNT(i.inventory_id) AS NUM_COPIES FROM (LibraryBranch lb JOIN Inventory i USING (branchID) JOIN Audio ad ON ad.audioID = i.copy_id) JOIN ArtistCredits a USING (audioID) WHERE ad.title = '" + req.body.parameterEntry + "' GROUP BY a.artistName, ad.title, lb.branchName ORDER BY NUM_COPIES DESC;";
                            dataAttrs = ["artistName", "title", "branchName", "NUM_COPIES"];
                            break;
                        case "Artist":
                            searchQuery = "SELECT a.artistName, ad.title, lb.branchName, COUNT(i.inventory_id) AS NUM_COPIES FROM (LibraryBranch lb JOIN Inventory i USING (branchID) JOIN Audio ad ON ad.audioID = i.copy_id) JOIN ArtistCredits a USING (audioID) WHERE a.artistName = '" + req.body.parameterEntry + "' GROUP BY a.artistName, ad.title, lb.branchName ORDER BY NUM_COPIES DESC;";
                            dataAttrs = ["artistName", "title", "branchName", "NUM_COPIES"];
                            break;
                    }
                    break;
            }
            
            console.log(searchQuery);
            con.query(searchQuery, function (err, result) {
                if (err) res.send("We have an error! Must refresh.\n" + err);
                else {
                    res.render('home.html', {results: result, attrs: dataAttrs});
                }
                
                con.end();
            });
        });
    });
};