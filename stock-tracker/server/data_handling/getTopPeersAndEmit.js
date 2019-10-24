const axios = require("axios");
const HOST = require('../server')
const TOKEN = require('../server')

const getTopPeersAndEmit = async (socket, stockSymbol) => {
  try {
    const topPeers = await axios.get(`${HOST}/stable/stock/${stockSymbol}/peers?token=${TOKEN}`);
    socket.emit("TopPeers", topPeers.data);
  }
  catch (error) {
    socket.emit("TopPeersError", error);
    console.error(`Top Peers Error: ${error}`);
  }
};
exports.getTopPeersAndEmit = getTopPeersAndEmit;
