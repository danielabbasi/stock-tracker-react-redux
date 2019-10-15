const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 5000;
const index = require("./test.js");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);
const day = 86400000;
const halfDay = day / 2;
const HOST = "https://sandbox.iexapis.com";
const TOKEN = "Tpk_139c39f1edae43fc8e5ab12451d30f4c";

function callNowAndInterval(fn, interval, ...args) {
  // calls function with extra arguements passed and returns interval
  fn(...args);
  return setInterval(() => fn(...args), interval);
}

io.on("connection", socket => {
  const intervals = {};
  console.info("New client connected");
  const stockCompanies = getCompaniesFromAPI(socket);
  socket.on("search", searchInput => {
    getSearchInputAndFilter(socket, searchInput, stockCompanies);
  });
  socket.on("symbol", (stockSymbol, chartTime) => {
    Object.values(intervals).forEach(clearInterval);
    intervals.stock = callNowAndInterval(
      getStockDataAndEmit,
      5000,
      socket,
      stockSymbol
    );
    intervals.overview = callNowAndInterval(
      getCompanyOverviewAndEmit,
      day,
      socket,
      stockSymbol
    );
    intervals.news = callNowAndInterval(
      getNewsDataAndEmit,
      day,
      socket,
      stockSymbol
    );
    intervals.chartData = callNowAndInterval(
      getChartDataAndEmit,
      halfDay,
      socket,
      stockSymbol,
      chartTime
    );
    intervals.peers = callNowAndInterval(
      getTopPeersAndEmit,
      day,
      socket,
      stockSymbol
    );
  });
  socket.on("chartTime", (stockSymbol, chartTime) => {
    clearInterval(intervals.chartData);
    intervals.chartData = callNowAndInterval(
      getChartDataAndEmit,
      halfDay,
      socket,
      stockSymbol,
      chartTime
    );
  });
  socket.on("disconnect", () => {
    Object.values(intervals).forEach(clearInterval);
    console.info("Client disconnected");
  });
});
server.listen(port, "0.0.0.0");
const getCompaniesFromAPI = async socket => {
  try {
    const res = await axios.get(
      "https://api.iextrading.com/1.0/ref-data/symbols"
    );
    const companies = res.data.map(data => ({
      name: data.name,
      symbol: data.symbol
    }));
    socket.emit("companies", companies);
    return companies;
  } catch (error) {
    socket.emit("CompaniesError", error);
    console.error(`Companies Error: ${error}`);
  }
};


const getCompanyOverviewAndEmit = async (socket, stockSymbol) => {
  try {
    const companyOverview = await axios.get(
      `${HOST}/stable/stock/${stockSymbol}/company?token=${TOKEN}`
    );
    const {
      companyName,
      symbol,
      exchange,
      industry,
      website,
      description
    } = companyOverview.data;
    const overview = {
      companyName,
      symbol,
      exchange,
      industry,
      website,
      description
    };
    socket.emit("CompanyOverview", overview);
  } catch (error) {
    socket.emit("CompanyOverviewError", error);
    console.error(`Company Overview Error: ${error}`);
  }
};
const getNewsDataAndEmit = async (socket, stockSymbol) => {
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
    socket.emit("LatestNews", news);
  } catch (error){
    socket.emit("LatestNewsError", error);
    console.error(`News Error: ${error}`)
  }
};

const getChartDataAndEmit = async (socket, stockSymbol, chartTime) => {
  try {
    const chartData = await axios.get(
      `${HOST}/stable/stock/${stockSymbol}/chart/${chartTime}?token=${TOKEN}`
    );
    const chart = chartData.data.map(data => ({
      close: data.close,
      date: data.date
    }));
    socket.emit("ChartData", chart);
  } catch (error) {
    socket.emit("ChartDataError", error);
    console.error(`Chart Data Error: ${error}`);
  }
};

const getTopPeersAndEmit = async (socket, stockSymbol) => {
  try {
    const topPeers = await axios.get(
      `${HOST}/stable/stock/${stockSymbol}/peers?token=${TOKEN}`
    );
    socket.emit("TopPeers", topPeers.data);
  } catch (error) {
    socket.emit("TopPeersError", error);
    console.error(`Top Peers Error: ${error}`);
  }
};

const getStockDataAndEmit = async (socket, stockSymbol) => {
  try {
    const resPromise = axios.get(
      `${HOST}/stable/stock/${stockSymbol}/quote?token=${TOKEN}`
    );
    const epsPromise = axios.get(
      `${HOST}/stable/stock/${stockSymbol}/earnings/1/actualEPS?token=${TOKEN}`
    );
    const dividendsPromise = axios.get(
      `${HOST}/stable/stock/${stockSymbol}/dividends/1y?token=${TOKEN}`
    );
    const [res, eps, dividends] = await Promise.all([
      resPromise,
      epsPromise,
      dividendsPromise
    ]);
    changeNullValues(res.data, eps.data);
    const currency =
      (dividends.data[0] && dividends.data[0].currency) || undefined; // if first arguement is trufy and second condition is trufy then set current, if not then set undefined
    const {
      latestPrice,
      change,
      changePercent,
      symbol,
      companyName,
      previousClose,
      high,
      low,
      previousVolume,
      marketCap,
      peRatio,
      open,
      week52High,
      week52Low,
      avgTotalVolume,
      ytdChange,
      latestTime,
      latestUpdate,
      isUSMarketOpen
    } = res.data;
    const stockData = {
      latestPrice,
      change,
      changePercent,
      symbol,
      companyName,
      previousClose,
      high,
      low,
      dayRange: low + "-" + high,
      previousVolume,
      marketCap,
      peRatio,
      open,
      week52High,
      week52Low,
      week52Range: week52Low + "-" + week52High,
      avgTotalVolume,
      earningsPerShare: eps.data,
      ytdChange,
      currency,
      latestTime,
      latestUpdate,
      isUSMarketOpen
    };
    console.info("Stock data is being sent");
    socket.emit("StockData", stockData); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    socket.emit("StockError", error);
    console.error(`Stock Error: ${error}`);
  }
};

const getSearchInputAndFilter = async (socket, searchInput, stockCompanies) => {
  try {
    console.log(searchInput);
    const companies = await stockCompanies;
    const c = companies.map(data => ({ symbol: data.symbol, name: data.name }));
    let suggestions = c
      .filter(
        company =>
          company.symbol.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
      )
      .slice(0, 10);
    socket.emit("suggestions", suggestions);
  } catch (error) {
    console.error(`Search Error: ${error}`);
  }
};

const changeNullValues = data => {
  Object.keys(data).forEach(key => {
    if (data[key] === null) {
      data[key] = "N/A";
    } else if (data[key] === true) {
      data[key] = "true";
    } else if (data[key] === false) {
      data[key] = "false";
    }
  });
};
