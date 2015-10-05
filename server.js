var express = require('express'),
	bodyParser = require('body-parser'),
	session = require('express-session');
	results = require('./routes/searchAPIs');

var app = express();

// sets the port for my application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use('/public', express.static(__dirname + '/public'));
app.use(session({secret: "jbengine"}));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// set the home page route
app.get('/', function(req, res) {

	if (req.session.blank) {
		req.session.blank = false;
	    res.render('index', {
	    	tryAgain: "<div class='try-again' ><p>Please try again.</p></div>"
	    });
	} else {
		res.render('index', {
    		tryAgain: "<div class='try-again' ><p></p></div>"
    	});
    };
});

// render the results
app.post('/results', urlencodedParser, results.show);

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});