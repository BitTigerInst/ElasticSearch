'use strict';

function getWhateverIWant() {
	var dao = require('../dao/search.server.dao');
	var someValueForReturn = dao.getSuggestions();
	return someValueForReturn;
}

exports.getWhateverIWant = getWhateverIWant;