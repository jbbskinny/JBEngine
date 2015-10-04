var express = require('express'),
	bodyParser = require('body-parser'),
	results = require('./routes/searchAPIs');

var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use('/public', express.static(__dirname + '/public'));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index');
});

app.post('/results', urlencodedParser, function (req, res) {
	console.log(req.body.search);
	res.render('results');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});