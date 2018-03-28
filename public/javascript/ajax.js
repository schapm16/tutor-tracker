function getRoster() {
	return $.get('/file/getRoster');
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