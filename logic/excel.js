const xlsx = require('xlsx');
const rosterHeaders = ['classCode', 'gradDate', 'name', 'email','github', 'tops', 'timeZone', 'introSent'];
const logHeaders = ['classCode', 'gradDate', 'name', 'email', 'github', 'date', 'timezoneDiff', 
										'confirmSent', 'showNoShow', 'topics', 'notes', 'tutorEval', 'payment'];

function parseFile() {
	return xlsx.readFile('../Students.xlsx');
}

function readRoster() {
	let workbook = parseFile();	
	
	return xlsx.utils.sheet_to_json(workbook.Sheets.Roster, {header: rosterHeaders});

}

function writeRoster() {

}

function readLog() {
	let workbook = parseFile();
	return xlsx.utils.sheet_to_json(workbook.Sheets.Log, {header: logHeaders});
}

function writeLog() {

}


module.exports = {
	readRoster,
	writeRoster,
	readLog,
	writeLog
};