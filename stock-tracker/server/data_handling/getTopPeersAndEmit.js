const axios = require("axios");

const requestTopPeersPromise = (HOST, TOKEN) => async stockSymbol => {
  try {
    const topPeers = await axios.get(
      `${HOST}/stable/stock/${stockSymbol}/peers?token=${TOKEN}`
    );
    return { isError: false, payload: topPeers.data };
  } catch (error) {
    console.error(`Top Peers Error: ${error}`);
    return { isError: true };
  }
};

exports.requestTopPeersPromise = requestTopPeersPromise;
