const httpServer = require('./src/httpServer');
const peerServer = require('./src/peerServer');
const blockChain = require('./src/Blockhain')

const http_port = process.env.HTTP_PORT ||  3001;
const p2p_port = process.env.P2P_PORT || 6001;
const initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];

peerServer.connectToPeers(initialPeers);
httpServer.initHttpServer(http_port);
peerServer.initP2PServer(p2p_port);
