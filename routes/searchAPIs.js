var Twitter = require('twitter-node-client').Twitter;
var querystring = require('qs');
var https = require('https');

exports.show = function (req, res) {

	var twitterData = null;
	var wikiData = null;

	var searchString = req.body.search;
	console.log(JSON.stringify(req.body.search));

	if (searchString === "") {

		res.render('index', {
			tryAgain: "<div class='try-again'>" + "Please try again." +
					  "</div>"
		});
		return;
	};	

	twitterSearch();
	wikiSearch();

	function twitterSearch () {

		var error = function (err, response, body) {
		    twitterData = "<h2>Twitter API v1.1 is currently down.</h2>"
		    complete();
		};
		var success = function (data) {
			twitterData = twitterDataParser( JSON.parse(data) );
			complete();
		};

		var config = {
		    "consumerKey": "HaMzggtHF05HBEDeut07xfZBW",
		    "consumerSecret": "7Yk0mPLK9UYQBudLqZFIdTTbQw3rluGnPtH4wsh7rs8aHIrMF2",
		    "accessToken": "3718692552-9H4jdt0U8L6ceKFnwRBJKjLcCvewtraRkiHJBaw",
		    "accessTokenSecret": "De2DuNBRKslyVVCD2HM7HN0HGSFRBRIv2Lyno4F8AXAHT",
		    "callBackUrl": ""
		};

		var twitter = new Twitter(config);

		twitter.getSearch({'q': searchString, 'count': 10}, error, success);
	};

	function wikiSearch () {

		var query = querystring.stringify({
			action: 'query',
			list: 'search',
			srsearch: searchString,
			srlimit: 10,
			srwhat: 'text',
			format: 'json'
		});
		var options = {
			hostname: 'en.wikipedia.org',
			path: '/w/api.php?' + query
		};

		var req = https.request(options, function(res) {

			if (!res) { 
				wikiData = "<h2>MediaWiki API is currently down.</h2>";
				complete();
			};

			var body = '';
			console.log("statusCode: ", res.statusCode);
			res.setEncoding('utf8');

			res.on('data', function(data) {
				body += data;
			});

			res.on('end', function() {
				wikiData = wikiDataParser( JSON.parse(body) );
				complete();
			});
		});

		req.end();

		req.on('error', function (err) {
			wikiData = "<h2>MediaWiki API is currently down.</h2>";
			complete();
		});
	};

	function complete() {
		if (wikiData !== null && twitterData !== null) {

			var inputBox = "<input type='text' id='input' name='search' value='" +
							searchString + "' />";
			res.render('results', { 
				inputBox: inputBox,
				wikiResults: wikiData, 
				twitterResults: twitterData
			});
		};
	};
};

function twitterDataParser (data) {

	var html;

	if (data === null) {
		html = "<h2>Twitter Results</h2>" + "<p>No search results found.</p>";
		return html;

	} else if (data.statuses == null) {
		html = "<h2>Twitter Results</h2>" + "<p>No search results found.</p>";
		return html;

	} else {
		if (data.statuses.length === 0) {
			html = "<h2>Twitter Results</h2>" + "<p>No search results found.</p>";
			return html;
		};	
	};

	var results = data.statuses;
	html = "<h2>Twitter Results</h2>";
	html += "<dl>";

	for (var tweet in results) {

		curr = results[tweet];
		html += "<dt>" + curr.user.screen_name + "</dt>" + 
				"<dd>" + curr.text + "</dd>";
	}

	html += "</dl>"
	return html;
};

function wikiDataParser (data) {

	var html;

	if (data === null) {
		html = "<h2>Wiki Results</h2>" + "<p>No search results found.</p>";
		return html;

	} else if (data.query === null) {
		html = "<h2>Wiki Results</h2>" + "<p>No search results found.</p>";
		return html;

	} else if (data.query.search === null) {
		html = "<h2>Wiki Results</h2>" + "<p>No search results found.</p>";
		return html;

	} else {
		if(data.query.search.length === 0) {
			html = "<h2>Wiki Results</h2>" + "<p>No search results found.</p>";
			return html;
		};
	};

    var results = data.query.search;
    html = "<h2>Wiki Results</h2>";
    html += "<dl>";

    for (var entry in results) {
        if (results.hasOwnProperty(entry)) {

            curr = results[entry] // Keeps current obect for cleanliness.
            currURL = "https://en.wikipedia.org/wiki/" + 
                        curr.title.replace(' ', '_');
            html += "<dt>" + "<a target='_blank' href='" + currURL + "'>" + 
                    curr.title + "</a>" + "</dt>" + "<dd>" + curr.snippet + 
                    "</dd>";
        };
    }

    html += "</dl>";
    return html;
};

module.exports.twitterParser = twitterDataParser;
module.exports.wikiParser = wikiDataParser;