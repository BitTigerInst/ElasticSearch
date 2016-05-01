'use strict';

module.exports = function (app) {
	var search = require('../controllers/search.server.controller');

	app.route('/get_search_result').post(search.retrieve);
};