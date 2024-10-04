// Create web server
var express = require('express');
var app = express();
app.use(express.static('public'));
var bodyParser = require('body-parser');
var fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

// create a comment
app.post('/comments', function(req, res) {
    var comment = req.body;
    console.log(comment);
    fs.appendFile('comments.txt', comment + '\n', function(err) {
        if (err) {
            console.log(err);
            res.status(500).send('Server error');
        } else {
            res.status(201).send('Comment created');
        }
    });
});

// get comments
app.get('/comments', function(req, res) {
    fs.readFile('comments.txt', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Server error');
        } else {
            res.status(200).send(data);
        }
    });
});

// start the server
app.listen(3000, function() {
    console.log('Server running on http://localhost:3000');
});