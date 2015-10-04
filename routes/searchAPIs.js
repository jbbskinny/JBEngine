var Twitter = require('twitter-node-client').Twitter;


exports.show = function (req, res) {

	var error = function (err, response, body) {
	    console.log('ERROR [%s]', err);
	};
	var success = function (data) {
	    //console.log('Data [%s]', data);
	    return;
	};

	console.log(req.body);

	var config = {
	    "consumerKey": "HaMzggtHF05HBEDeut07xfZBW",
	    "consumerSecret": "7Yk0mPLK9UYQBudLqZFIdTTbQw3rluGnPtH4wsh7rs8aHIrMF2",
	    "accessToken": "3718692552-9H4jdt0U8L6ceKFnwRBJKjLcCvewtraRkiHJBaw",
	    "accessTokenSecret": "De2DuNBRKslyVVCD2HM7HN0HGSFRBRIv2Lyno4F8AXAHT",
	    "callBackUrl": ""
	}


	var twitter = new Twitter(config);

	twitter.getSearch({'q':'Lebron James','count': 10}, error, success);

	res.render('results')
}