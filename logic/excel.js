const xlsx = require('xlsx');
var workbook = xlsx.readFile('../../Students.xlsx');

console.log(workbook);