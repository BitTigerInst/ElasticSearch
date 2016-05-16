var express = require('express');
var router = express.Router();
var config = require('../config');
var Twit = require('twit');
var T = new Twit({
  consumer_key: config.default.consumer_key,
  consumer_secret: config.default.consumer_secret,
  access_token: config.default.access_token,
  access_token_secret: config.default.access_token_secret,
  timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
})

// test url with sample parameter
router.get('/search', function(req, res, next) {
	var query = 'a';
	var count = 1;
	var resultType = 'recent';
	var geoCode = [-22.912214, -43.230182, '1km'];
	T.get('search/tweets', { q: query, geocode: geoCode, count: count, result_type: resultType}, function(err, data, response) {
  		res.send(data);
  	});
});
// searching query API
router.get('/search/:query/:geolocalization/:count/:resultType/', function(req, res, next) {
	var query = req.params.query;
	var count = req.params.count;
	var resultType = req.params.resultType;
	var geoCode = req.params.geolocalization;
	T.get('search/tweets', { q: query, geocode: geoCode, count: count, result_type: resultType}, function(err, data, response) {
  		res.send(data);
	});
});

module.exports = router;
