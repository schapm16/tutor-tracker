 const xlsxPopulate = require('xlsx-populate');

// === Workbook Functions === //

// Style workbook.  Returns resolved Promise -> workbook
function styleFile(workbook) {
	console.log('Style File');
	
	let roster = workbook.sheet('Roster');
	let rosterLastCell = roster.usedRange().endCell();
	let rosterBody = roster.range('A2', rosterLastCell);

	rosterBody.style({
		horizontalAlignment: 'center',
		verticalAlignment: 'center',
		border: 'medium',
		borderColor: 'CCCCCC'
	});

	for (let i = 1; i <= rosterLastCell.rowNumber(); i++) {
		roster.row(i).height(30);
	}

	let log = workbook.sheet('Log');
	let logLastCell = roster.usedRange().endCell();
	let logBody = log.range('A2', logLastCell);

	logBody.style({
		horizontalAlignment: 'center',
		verticalAlignment: 'center',
		border: 'medium',
		borderColor: 'CCCCCC'
	});

	for (let i = 1; i <= logLastCell.rowNumber(); i++) {
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
	return parseFile()
		.then(function(workbook) {
			let roster = workbook.sheet('Roster');
			let rosterLastCell = roster.usedRange().endCell();
			let rosterBody = roster.range('A2', rosterLastCell);

			rosterBody.clear();
			roster.cell('A1').value(data);
			
			return workbook;
		})
		.then(function(workbook) {
			return styleFile(workbook);
		})
		.then(function(workbook) {
			return writeFile(workbook);
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