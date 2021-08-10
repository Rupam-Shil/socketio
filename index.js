import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
	console.log('A user connected');
	socket.on('disconnect', () => {
		console.log('user disconnect');
	});
	socket.on('chat message', (msg) => {
		io.emit('chat message', msg);
	});
});
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

server.listen(4000, () => {
	console.log('Listening on port 4000');
});
