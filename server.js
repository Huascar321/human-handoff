const express = require('express');
const app = express();
//const server = require('http').createServer();
const options = {
	cors: true,
	origins:["http://localhost:3000/"],
};
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

const io = require('socket.io')(server, options);

app.get('/express_backend', (req, res) => {
	res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

io.on('connection', (socket) => {
	console.log('new user connected');
	socket.emit('connection', null);
});
