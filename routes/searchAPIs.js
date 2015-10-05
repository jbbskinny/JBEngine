var Twitter = require('twitter-node-client').Twitter;
var querystring = require('qs');
var https = require('https');

exports.show = function (req, res) {

	var twitterData = null;
	var wikiData = null;

	var searchString = req.body.search;
	console.log(JSON.stringify(searchString));

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
			console.log(typeof(JSON.parse(data)));
			twitterData = twitterDataParser(JSON.parse(data));
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
			path: '/w/api.php?' + query,
			headers: {
				withCredentials: true,
			}
		};

		var req = https.request(options, function(res) {

			if (!res) { wikiData = "An error occured!" };

			console.log("statusCode: ", res.statusCode);
			res.setEncoding('utf8');

			var body = '';

			res.on('data', function(data) {
				body += data;
			});

			res.on('end', function() {
				var jdata = JSON.parse(body);
				wikiData = wikiDataParser(jdata);
				complete();
			});

		});

		req.end();

		req.on('error', function (err) {
			wikiData = "<h2>MediaWiki API is currently down.</h2>";
			complete();
		})

	};

	function complete() {
		if (wikiData !== null && twitterData !== null) {
			res.render('results', {
				inputBox: searchString,
				wikiResults: wikiData, 
				twitterResults: twitterData
			});
		};
	};
};

function wikiDataParser (data) {
    var results = data.query.search;
    var html;

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
        }
    }
    html += "</dl>";

    return html;
};

function twitterDataParser (data) {

	var results = data.statuses;
	var html;

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