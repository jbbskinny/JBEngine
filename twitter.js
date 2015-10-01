/*
 Twitter client app
 see: https://github.com/BoyCook/TwitterJSClient
 */

// Import from twitter node client
//var twitterNode = require('twitter-node-client').Twitter

var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log('Data [%s]', data);
};
var config = {
    "consumerKey": "{Mine}",
    "consumerSecret": "{Mine}",
    "accessToken": "{Mine}",
    "accessTokenSecret": "{Mine}",
    "callBackUrl": ""
}

var Twitter = require('twitter-node-client').Twitter;

var twitter = new Twitter(config);

twitter.getSearch({'q':'Lebron James','count': 10}, error, success);

