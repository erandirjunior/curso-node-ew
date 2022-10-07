const http = require('http');

http.createServer((reqquest, response) => {
	response.end('Hello Node!');
})
.listen(8000, '0.0.0.0', () => console.log('Server up!'));