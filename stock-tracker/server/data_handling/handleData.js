const { getSearchInputAndFilter } = require("./getSearchInputAndFilter");
const { getStockDataAndEmit } = require("./getStockDataAndEmit");
const { getTopPeersAndEmit } = require("./getTopPeersAndEmit");
const { getChartDataAndEmit } = require("./getChartDataAndEmit");
const { getNewsDataAndEmit } = require("./getNewsDataAndEmit");
const { getCompanyOverviewAndEmit } = require("./getCompanyOverviewAndEmit");
const { getCompaniesFromAPI } = require("./getCompaniesFromAPI");
const {
  SEARCH_INPUT,
  TOP_PEERS,
  STOCK_DATA,
  LATEST_NEWS,
  CHART_DATA,
  COMPANY_OVERVIEW
} = require("./constants");
const DAY_IN_MS = 86400000;
const HALF_DAY = DAY_IN_MS / 2;

function callNowAndInterval(fn, interval, ...args) {
  fn(...args);
  return setInterval(() => fn(...args), interval);
}

const HANDLE_DATA = socket => {
  const intervals = {};
  console.info("New client connected");
  const stockCompanies = getCompaniesFromAPI(socket);

  socket.on(SEARCH_INPUT, searchInput => {
    getSearchInputAndFilter(socket, searchInput, stockCompanies);
  });

  socket.on(CHART_DATA, (stockSymbol, chartTime) => {
    if (stockSymbol === "") {
      clearInterval(intervals.chartData);
      return;
    }
    clearInterval(intervals.chartData);
    console.log(chartTime);
    intervals.chartData = callNowAndInterval(
      getChartDataAndEmit,
      HALF_DAY,
      socket,
      stockSymbol,
      chartTime
    );
  });

  socket.on(STOCK_DATA, stockSymbol => {
    if (stockSymbol === "") {
      clearInterval(intervals.stock);
      return;
    }
    clearInterval(intervals.stock);
    intervals.stock = callNowAndInterval(
      getStockDataAndEmit,
      10000,
      socket,
      stockSymbol
    );
  });

  socket.on(TOP_PEERS, stockSymbol => {
    if (stockSymbol === "") {
      clearInterval(intervals.peers);
      return;
    }
    clearInterval(intervals.peers);
    intervals.peers = callNowAndInterval(
      getTopPeersAndEmit,
      DAY_IN_MS,
      socket,
      stockSymbol
    );
  });

  socket.on(LATEST_NEWS, stockSymbol => {
    if (stockSymbol === "") {
      clearInterval(intervals.news);
      return;
    }
    clearInterval(intervals.news);
    intervals.news = callNowAndInterval(
      getNewsDataAndEmit,
      DAY_IN_MS,
      socket,
      stockSymbol
    );
  });

  socket.on(COMPANY_OVERVIEW, stockSymbol => {
    if (stockSymbol === "") {
      clearInterval(intervals.overview);
      return;
    }
    clearInterval(intervals.overview);
    intervals.overview = callNowAndInterval(
      getCompanyOverviewAndEmit,
      DAY_IN_MS,
      socket,
      stockSymbol
    );
  });

  socket.on("disconnect", () => {
    Object.values(intervals).forEach(clearInterval);
    console.info("Client disconnected");
  });
};

exports.HANDLE_DATA = HANDLE_DATA;
