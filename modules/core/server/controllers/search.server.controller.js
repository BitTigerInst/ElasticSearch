'use strict';

exports.retrieve = function (req, res) {
    var dao = require('../dao/search.server.dao');
    var listResult = dao.list();
    listResult.exec(function (err, results) {
    	if(err) { 
			console.log(err);
		}
		else {
			res.json(results);
		}
    });
};
