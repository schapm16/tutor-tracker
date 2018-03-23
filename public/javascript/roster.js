$(document).ready(function() {
console.log('Script Running');

$.get('/file/readRoster')
	.done(function(data) {
		console.log(data);
	});

});