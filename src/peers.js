const WebSocket = require('ws');
let sockets = require('./sockets');

const MessageType = {
	QUERY_LATEST: 0,
	QUERY_ALL: 1,
	RESPONSE_BLOCKCHAIN: 2
};

const connectToPeers = (newPeers) => {
	console.log('Connecting new peers: ', newPeers);
	newPeers.forEach((peer) => {
		console.log('Peer:', peer);
		let webSocket = new WebSocket(peer);
		webSocket.on('open', () => {
			initConnection(webSocket);
		});
		webSocket.on('error', () => {
			console.log(`Connection for ${peer} failed`);
		});
	});
};

const initConnection = (webSocket) => {
	sockets.push(webSocket);
	initMessageHandler(webSocket);
	initErrorHandler(webSocket);
	write(webSocket, 'init connection');
};

const initMessageHandler = (webSocket) => {
	webSocket.on('message', (data) => {
		const message = JSON.parse(data);
		// console.log(`Received message ${JSON.stringify(message)}`);
		switch (message.type) {
			case MessageType.QUERY_LAST:
				console.log('Query last');
				write(webSocket, 'query last');
				break;
			case MessageType.QUERY_ALL:
				console.log('Query all');
				write(webSocket, 'query all');
				break;
			case MessageType.RESPONSE_BLOCKCHAIN:
				console.log('blockchain');
				// handle block chain response;
				break;
		}
	});
};

const initErrorHandler = (webSocket) => {
	function closeConnection (webSocket) {
		console.log(`Connection failed to peer: ${webSocket.url}`);
		// Remove given websocket from sockets array
		console.log('Before: ', sockets);
		sockets.splice(sockets.indexOf(webSocket), 1);
		console.log('After: ', sockets);
	}
	webSocket.on('close', () => closeConnection(webSocket));
	webSocket.on('error', () => closeConnection(webSocket));
};

const initP2PServer = (port) => {
	let server = new WebSocket.Server({
		port: port
	});
	server.on('connection', (webSocket) => initConnection(webSocket));
	console.log(`Listening websocket p2p port on : ${port}`);
};

const write = (webSocket, message) => {
	console.log('WRITE!');
	console.log('Message:', message);
	webSocket.send(JSON.stringify(message));
};
const broadcast = (message) => sockets.forEach((socket) => write(socket, message));

module.exports = {
	connectToPeers,
	initP2PServer,
	broadcast
};