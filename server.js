const express = require('express');
const app = express();
PORT = 3000;


app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile('index.html');
});

const fileRouter = require('./routes/fileRoutes');
app.use('/file', fileRouter);

app.listen(PORT, function() {
	console.log('Listening on Port ' + PORT);
});