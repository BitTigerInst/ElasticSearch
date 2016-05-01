'use strict';

exports.retrieve = function (req, res) {

	console.log("Get author: "+req.body.author+" and text "+req.body.text);


	var service = require('../service/search.server.service');
	var listResult = service.getWhateverIWant();
	listResult.exec(function (err, results) {
		if(err) { 
		console.log(err);
	}
	else {
		res.json(results);
	}
	});
};