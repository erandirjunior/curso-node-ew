const http = require('http');

http.createServer((reqquest, response) => {
	response.end('Hello Node!');
})
.listen(8080, 'localhost', () => console.log('Server up!'));