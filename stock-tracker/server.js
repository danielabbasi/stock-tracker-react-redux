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
let companySymbol;
let interval;

io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  // getCompaniesFromAPI(socket)
  socket.on("symbol", (symbol) => {
    if (symbol !== '') {
      companySymbol = symbol;
      console.log(companySymbol)
      clearInterval(interval);
      interval = setInterval(() => getApiAndEmit(socket), 1000);
    }
  })
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

const getCompaniesFromAPI = async socket => {
  try {
    const res = await axios.get(
      'https://api.iextrading.com/1.0/ref-data/symbols'
    )
    socket.emit("companies", res.data)
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

const getApiAndEmit = async socket => {
  try {
    const resPromise = axios.get(
      `https://sandbox.iexapis.com/stable/stock/${companySymbol}/quote?token=Tpk_139c39f1edae43fc8e5ab12451d30f4c`
    );
    const epsPromise = axios.get(
      `https://sandbox.iexapis.com/stable/stock/${companySymbol}/earnings/1/actualEPS?token=Tpk_139c39f1edae43fc8e5ab12451d30f4c`
    )
    const [res, eps] = await Promise.all([resPromise, epsPromise])
    changeNullValues(res.data,eps.data)

    const {companyName, previousClose, high, low, previousVolume, marketCap, peRatio, open, week52High, week52Low, avgTotalVolume, ytdChange } = res.data

    stockData = {
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
    socket.emit("FromAPI", stockData); // Emitting a new message. It will be consumed by the client
  } catch (error) {
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