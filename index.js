const httpServer = require('./src/httpServer');
const peers = require('./src/peers');

const http_port = process.env.HTTP_PORT ||  3001;
const p2p_port = process.env.P2P_PORT || 6001;
const initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];

console.log('Initial peers:', initialPeers);
peers.connectToPeers(initialPeers);
httpServer.initHttpServer(http_port);
peers.initP2PServer(p2p_port);