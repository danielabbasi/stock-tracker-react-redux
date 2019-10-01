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

io.on("connection", socket => {
  console.log("New client connected");
  let interval;
  getCompaniesFromAPI(socket)
  socket.on("symbol", (stockSymbol, chartTime) => {
    if (interval) {
      console.log("symbol " + stockSymbol)
      clearInterval(interval);
    }
    getApiAndEmit(socket, stockSymbol, chartTime)
    interval = setInterval(() => getApiAndEmit(socket, stockSymbol, chartTime), 5000);
  })
  socket.on("chartTime", (stockSymbol, chartTime) => {
    getApiAndEmit(socket, stockSymbol, chartTime)
    clearInterval(interval)
    interval = setInterval(() => getApiAndEmit(socket, stockSymbol, chartTime), 5000);
  })
  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

const getCompaniesFromAPI = async socket => {
  try {
    const res = await axios.get(
      'https://api.iextrading.com/1.0/ref-data/symbols'
    )
    const companies = res.data.map(data => ({ name: data.name, symbol: data.symbol }))
    socket.emit("companies", companies)
  } catch (error) {
    console.log("companies error ")
    console.error(`Error: ${error}`);
  }
}

const getCompanyOverviewAndEmit = async (socket, stockSymbol) => {
  try {
    const companyOverviewPromise = axios.get(
      `https://sandbox.iexapis.com/stable/stock/${stockSymbol}/company?token=Tpk_139c39f1edae43fc8e5ab12451d30f4c`)
      
    
    } catch {
    console.log("company overview error ")
    console.error(`Error: ${error}`);
  }

}

const getApiAndEmit = async (socket, stockSymbol, chartTime) => {
  try {
    const resPromise = axios.get(
      `https://sandbox.iexapis.com/stable/stock/${stockSymbol}/quote?token=Tpk_139c39f1edae43fc8e5ab12451d30f4c`
    );
    const epsPromise = axios.get(
      `https://sandbox.iexapis.com/stable/stock/${stockSymbol}/earnings/1/actualEPS?token=Tpk_139c39f1edae43fc8e5ab12451d30f4c`
    )
    const chartDataPromise = axios.get(
      `https://sandbox.iexapis.com/stable/stock/${stockSymbol}/chart/${chartTime}?token=Tpk_139c39f1edae43fc8e5ab12451d30f4c`
    )
    const latestNewsPromise = axios.get(
      `https://cloud.iexapis.com/stable/stock/${stockSymbol}/news/last/5?token=pk_9be28da235714828a592abf7395e810f`
    )

    const [res, eps, chartData, latestNews, companyOverview] = await Promise.all([resPromise, epsPromise, chartDataPromise, latestNewsPromise, companyOverviewPromise])
    changeNullValues(res.data, eps.data)

    const { latestPrice, change, changePercent, symbol, companyName, previousClose, high, low, previousVolume, marketCap, peRatio, open, week52High, week52Low, avgTotalVolume, ytdChange } = res.data
    stockData = {
      latestPrice,
      change,
      changePercent,
      symbol,
      companyName,
      previousClose,
      high,
      low,
      dayRange: low + '-' + high,
      previousVolume,
      marketCap,
      peRatio,
      open,
      week52High,
      week52Low,
      week52Range: week52Low + '-' + week52High,
      avgTotalVolume,
      earningsPerShare: eps.data,
      ytdChange
    }

    const news = latestNews.data.map(data => ({ headline: data.headline, datetime: data.datetime, source: data.source }))
    const chart = chartData.data.map(data => ({ close: data.close, date: data.date }))
    console.log(companyOverview.data)
   
    socket.emit("FromAPI", stockData, chart, news); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.log("stock data error ")
    console.error(`Error: ${error}`);
  }
};

const changeNullValues = (data) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === null) {
      data[key] = 'N/A'
    } else if (data[key] === true) {
      data[key] = 'true'
    } else if (data[key] === false) {
      data[key] = 'false'
    }
  })
}