const express = require('express');
const fileRouter = express.Router();

const fileMethods = require('../logic/excel.js');


fileRouter.get('/readRoster', function(req, res) {
	let roster = fileMethods.readRoster();

	res.send(roster);
});



module.exports = fileRouter;
