const WebSocket = require('ws');
let sockets = require('./sockets');

const MessageType = {
	QUERY_LATEST: 0,
	QUERY_ALL: 1,
	RESPONSE_BLOCKCHAIN: 2
};

let initP2PServer = (port) => {
	let server = new WebSocket.Server({ port: port });
	server.on('connection', ws => initConnection(ws));
	//console.log('listening websocket p2p port on: ' + port);

};

let initConnection = (ws) => {
	sockets.push(ws);
	initMessageHandler(ws);
	initErrorHandler(ws);
	//write(ws, { 'type': MessageType.QUERY_LATEST });
};

let initMessageHandler = (ws) => {
	ws.on('message', (data) => {
		let message = JSON.parse(data);
		console.log('Received message' + JSON.stringify(message));
		switch (message.type) {
			case MessageType.QUERY_LATEST:
				write(ws, { 'type': MessageType.RESPONSE_BLOCKCHAIN, 'data': 'lala' });
				break;
			case MessageType.QUERY_ALL:
				write(ws, { 'type': MessageType.RESPONSE_BLOCKCHAIN, 'data': 'lallala' });
				break;
			case MessageType.RESPONSE_BLOCKCHAIN:
				console.log('Response blockchain!');
				break;
		}
	});
};

let initErrorHandler = (ws) => {
	let closeConnection = (ws) => {
		console.log(`connection failed to peer: ${ws.url}`);
		sockets.splice(sockets.indexOf(ws), 1);
	};
	ws.on('close', () => closeConnection(ws));
	ws.on('error', () => closeConnection(ws));
};


let connectToPeers = (newPeers) => {
	newPeers.forEach((peer) => {
		let ws = new WebSocket(peer);
		ws.on('open', () => {
			initConnection(ws);
			console.log(`Connected to ${ws.url}`)
		});
		ws.on('error', () => {
			console.log(`Connection failed on ${peer}`);
		});
	});
};

let write = (ws, message) => ws.send(JSON.stringify(message));
let broadcast = (message) => sockets.forEach(socket => write(socket, message));

module.exports = {
	initP2PServer,
	broadcast,
	connectToPeers
};