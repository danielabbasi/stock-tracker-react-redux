const axios = require("axios");

const getNewsDataAndEmit = (HOST, TOKEN) => async stockSymbol => {
  try {
    const latestNews = await axios.get(
      `${HOST}/stable/stock/${stockSymbol}/news/last/5?token=${TOKEN}`
    );
    const news = latestNews.data.map(data => ({
      headline: data.headline,
      datetime: data.datetime,
      source: data.source,
      url: data.url
    }));
    return { isError: false, payload: news };
  } catch (error) {
    console.error(`News Error: ${error}`);
    return { isError: true };
  }
};

exports.getNewsDataAndEmit = getNewsDataAndEmit;
