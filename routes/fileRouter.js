const express = require('express');
const fileRouter = express.Router();

const excelMethods = require('../logic/excelMethods.js');


fileRouter.get('/requestRoster', function(req, res) {
	let roster = excelMethods.readRoster().then(function(roster) {
		res.json(roster);
	});
});

fileRouter.post('/writeRoster', function(req, res) {
	excelMethods.writeRoster(req.body.data)
		.then(function() {
			res.sendStatus(200);
		});
});



module.exports = fileRouter;
