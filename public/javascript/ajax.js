function requestRoster() {
	return $.get('/file/requestRoster');
}

function writeRoster(data) {
	return $.ajax({
		method: 'POST',
		url: '/file/writeRoster', 
		data: JSON.stringify({data: data}),
		traditional: 'true',
		contentType: 'application/json'
	});
}