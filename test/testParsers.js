var results = require('../routes/searchAPIs.js');

exports.testTwitterParser1 = function(test) {
	var twitterData = results.twitterParser( {
		"statuses": [
			{"user": {
				"screen_name": "jbbskinny"
			},
			"text": "Hello, world!"
		}]
	});

	test.equal(
		twitterData, // actual
		"<h2>Twitter Results</h2>" + "<dl><dt>jbbskinny</dt>" +
		"<dd>" + "Hello, world!" + "</dd>" + "</dl>", // expected
		"The twitter API search did not return my only tweet!"
	);
	test.done();
};

exports.testTwitterParser2 = function(test) {
	var twitterData = results.twitterParser(null);

	test.equal(
		twitterData, //actual
		"<h2>Twitter Results</h2>" + "<p>No search results found.</p>", //expected
		"Should have handled null value."
	);
	test.done();
};

exports.testTwitterParser3 = function(test) {
	var twitterData = results.twitterParser( {"statuses": null} );

	test.equal(
		twitterData, // actual
		"<h2>Twitter Results</h2>" + "<p>No search results found.</p>", //expected
		"Should have handled data.statuses being null."
	);
	test.done();
};

exports.testTwitterParser4 = function(test) {
	var twitterData = results.twitterParser( {"statuses": []} );

	test.equal(
		twitterData, // actual
		"<h2>Twitter Results</h2>" + "<p>No search results found.</p>", //expected
		"Should have handled data.statuses having length 0."
	);
	test.done();
};


exports.testWikiParser1 = function(test) {
	var wikiData = results.wikiParser({
		"query": null
	});

	test.equal(
		wikiData, // actual
		"<h2>Wiki Results</h2>" + "<p>No search results found.</p>", //expected
		"Should handle data.query being null."
	);
	test.done();
};

exports.testWikiParser2 = function(test) {
	var wikiData = results.wikiParser({
		"query": {
			search: null
		}
	});

	test.equal(
		wikiData, // actual
		"<h2>Wiki Results</h2>" + "<p>No search results found.</p>", //expected
		"Should handle data.query.search being null."
	);
	test.done();
};

exports.testWikiParser3 = function(test) {
	var wikiData = results.wikiParser({
		"query": {
			search: []
		}
	});

	test.equal(
		wikiData, // actual
		"<h2>Wiki Results</h2>" + "<p>No search results found.</p>", //expected
		"Should handle data.query.search having length 0."
	);
	test.done();
};

