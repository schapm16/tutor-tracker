 const xlsxPopulate = require('xlsx-populate');

// === Workbook Functions === //

// Style workbook.  Returns resolved Promise -> workbook
function styleFile(workbook) {
	console.log('Style File');
	
	let roster = workbook.sheet('Roster');
	let rosterLastRow = roster.usedRange()._maxRowNumber;
	let rosterLastCol = roster.usedRange()._maxColumnNumber;
	let rosterBody = roster.range(2, 1,  rosterLastRow, rosterLastCol);

	rosterBody.style({
		horizontalAlignment: 'center',
		border: 'medium',
		borderColor: 'CCCCCC'
	});

	for (let i = 1; i <= rosterLastRow; i++) {
		roster.row(i).height(30);
	}

	let log = workbook.sheet('Log');
	let logLastRow = log.usedRange()._maxRowNumber;
	let logLastCol = log.usedRange()._maxColumnNumber;
	let logBody = log.range(2, 1, logLastRow, logLastCol);

	logBody.style({
		horizontalAlignment: 'center',
		border: 'medium',
		borderColor: 'CCCCCC'
	});

	for (let i = 1; i <= logLastRow; i++) {
		log.row(i).height(15);
	}

	return workbook;
}

// Async read and parse of Excel File.  Returns pending Promise.
function parseFile() {
	console.log('Parse File');
	return xlsxPopulate.fromFileAsync('../Students.xlsx');
}

// Async write of Excel File.  Returns pending Promise.
function writeFile(workbook) {
	console.log('Write File');
	return workbook.toFileAsync('../Students.xlsx');
}

// === End Workbook Functions === //

// === Worksheet Functions === //

// Gets all values from Roster worksheet.  Returns resolved Promise -> roster values
function readRoster() {
	console.log('Read Roster');
	return parseFile().then(function(workbook) {
		return workbook.sheet('Roster').usedRange().value();
	});
}

// Updates and writes all values to Roster worksheet.
function writeRoster(data) {
	console.log('Write Roster');
	parseFile()
		.then(function(workbook) {
			workbook.sheet('Roster').usedRange().value(data);
			return workbook;
		})
		.then(function(workbook) {
			return styleFile(workbook);
		})
		.then(function(workbook) {
			writeFile(workbook);
		})
		.catch(function(error) {
			console.log(error);
		});
}

function readLog() {
	return parseFile().then(function(workbook) {
		return workbook.sheet('Log').usedRange().value();
	});
}

function writeLog() {

}

// === End Worksheet functions === //


module.exports = {
	readRoster,
	writeRoster,
	readLog,
	writeLog
};