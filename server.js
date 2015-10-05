var express = require('express'),
	bodyParser = require('body-parser'),
	results = require('./routes/searchAPIs');

var app = express();

// sets the port for my application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use('/public', express.static(__dirname + '/public'));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// set the home page route
app.get('/', function(req, res) {

    res.render('index', {
    	tryAgain: "<div class='tryAgain' ><p></p></div>"
    });
});

// render the results
app.post('/results', urlencodedParser, results.show);

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});