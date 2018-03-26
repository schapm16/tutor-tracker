const express = require('express');
const app = express();
const bodyParser = require('body-parser');
PORT = 3000;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/roster', function(req, res) {
	res.sendFile(__dirname + '/public/roster.html');
});

app.use('/file', require('./routes/fileRouter.js'));

app.listen(PORT, function() {
	console.log('Listening on Port ' + PORT);
});