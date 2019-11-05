const axios = require("axios");
const { HOST, TOP_PEERS } = require("./constants");
const TOKEN = process.env.TOKEN;

const getTopPeersAndEmit = async (socket, stockSymbol) => {
  try {
    const topPeers = await axios.get(
      `${HOST}/stable/stock/${stockSymbol}/peers?token=${TOKEN}`
    );
    socket.emit(TOP_PEERS, { data: topPeers.data });
  } catch (error) {
    socket.emit(TOP_PEERS, { isError: true });
    console.error(`Top Peers Error: ${error}`);
  }
};

exports.getTopPeersAndEmit = getTopPeersAndEmit;
