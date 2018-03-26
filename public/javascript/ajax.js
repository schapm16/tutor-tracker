function requestRoster() {
	return $.get('/file/requestRoster');
}

function postRoster(data) {
	return $.ajax({
		method: 'POST',
		url: '/file/postRoster', 
		data: JSON.stringify({data: data}),
		traditional: 'true',
		contentType: 'application/json'
	});
}