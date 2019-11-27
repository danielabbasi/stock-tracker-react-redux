const {
  requestSearchInputAndCreateSuggestions
} = require("./getSearchInputAndFilter");
const { requestStockDataPromise } = require("./getStockDataAndEmit");
const { requestTopPeersPromise } = require("./getTopPeersAndEmit");
const { requestChartDataPromise } = require("./getChartDataAndEmit");
const { requestNewsDataPromise } = require("./getNewsDataAndEmit");
const {
  requestCompanyOverviewPromise
} = require("./getCompanyOverviewAndEmit");
const { getCompaniesFromAPI } = require("./getCompaniesFromAPI");
const {
  SEARCH_INPUT,
  TOP_PEERS,
  STOCK_DATA,
  LATEST_NEWS,
  CHART_DATA,
  COMPANY_OVERVIEW,
  HOST
} = require("./constants");
const TOKEN = process.env.TOKEN;
const DAY_IN_MS = 86400000;
const HALF_DAY = DAY_IN_MS / 2;

function callNowAndInterval(fn, interval, ...args) {
  fn(...args);
  return setInterval(() => fn(...args), interval);
}

const rpc = async (socket, APICall, replyTo) => {
  try {
    console.info(replyTo);
    const result = await APICall;
    socket.emit(replyTo, { isError: false, data: result });
  } catch (error) {
    console.error(error);
    socket.emit(replyTo, { isError: true });
  }
};

const getCompanyOverviewData = requestCompanyOverviewPromise(HOST, TOKEN);
const getNewsData = requestNewsDataPromise(HOST, TOKEN);
const getChartData = requestChartDataPromise(HOST, TOKEN);
const getTopPeersData = requestTopPeersPromise(HOST, TOKEN);
const getStockData = requestStockDataPromise(HOST, TOKEN);

const HANDLE_DATA = socket => {
  const intervals = {};
  console.info("New client connected");
  const stockCompanies = getCompaniesFromAPI(socket);

  socket.on(SEARCH_INPUT, async (replyTo, searchInput) => {
    rpc(
      socket,
      requestSearchInputAndCreateSuggestions(searchInput, stockCompanies),
      replyTo
    );
  });

  socket.on(CHART_DATA, async (replyTo, stockSymbol, chartTime) => {
    rpc(socket, getChartData(stockSymbol, chartTime), replyTo);
  });

  socket.on(STOCK_DATA, async (replyTo, stockSymbol) => {
    rpc(socket, getStockData(stockSymbol), replyTo);
  });

  socket.on(TOP_PEERS, async (replyTo, stockSymbol) => {
    rpc(socket, getTopPeersData(stockSymbol), replyTo);
  });

  socket.on(LATEST_NEWS, async (replyTo, stockSymbol) => {
    setTimeout(() => {
      rpc(socket, getNewsData(stockSymbol), replyTo);
    }, 4000);
  });

  socket.on(COMPANY_OVERVIEW, async (replyTo, stockSymbol) => {
    rpc(socket, getCompanyOverviewData(stockSymbol), replyTo);
  });

  socket.on("disconnect", () => {
    Object.values(intervals).forEach(clearInterval);
    console.info("Client disconnected");
  });
};

exports.HANDLE_DATA = HANDLE_DATA;
