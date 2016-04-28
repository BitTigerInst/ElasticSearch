'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.dao'),
	UrlLink = mongoose.model('UrlLink');

exports.dropModel = function () {
	UrlLink.drop();
};

exports.create = function(data) {
	var urlLink = new UrlLink(data);

	urlLink.save(function (err) {
		if(err) { 
			console.log(errorHandler.getErrorMessage(err));
		}
	}); 
};

exports.read = function(_title) {
	UrlLink.find({ title: _title }, function (err, dataFromDB) {
		if(err) { 
			console.log(errorHandler.getErrorMessage(err));
		}
		return dataFromDB;
	});
};

exports.update = function(conditions, dataForUpdate) {
	UrlLink.findOneAndUpdate(conditions, dataForUpdate, function (err, dataFromDB) {
		if(err) { 
			console.log(errorHandler.getErrorMessage(err));
		}
		return dataFromDB;
	});
};

exports.delete = function(conditions) {
	UrlLink.findOneAndRemove(conditions, function (err, dataFromDB) {
		if(err) { 
			console.log(errorHandler.getErrorMessage(err));
		}
		return dataFromDB;
	});
};

exports.list = function() {
	return UrlLink.find();
	// UrlLink.find({}, function (err, dataFromDB) {
	// 	if(err) { 
	// 		console.log(errorHandler.getErrorMessage(err));
	// 	}
	// 	// console.log(dataFromDB);
	// 	return dataFromDB;
	// });

	// var listData = {};
	// UrlLink.find().exec(function (err, dataFromDB) {
	// 	listData = dataFromDB
	// });
	// return listData;
};