const http = require('http');

const server = http.createServer((req, res) => {
	res.end('Hello World');
})

server.listen(7545, () => {
	console.log('Server listening at port 7545');
})

// https://www.freecodecamp.org/news/get-started-with-nodejs/#let-s-create-a-server