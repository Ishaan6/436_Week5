const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.listen(port, () => console.log(`app on port ${port}!`));

app.get(/^(.+)$/, function(req, res){ 
	console.log('static file require: ' + req.params[0]);
	res.sendFile(__dirname + req.params[0]);
});
