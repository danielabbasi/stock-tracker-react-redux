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
  socket.on("symbol", function (symbol) {
    companySymbol = symbol;
    console.log(companySymbol);
  })
  if (companySymbol) {
    interval = setInterval(() => getApiAndEmit(socket), 1000);
  }
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/${companySymbol}/quote?token=Tpk_139c39f1edae43fc8e5ab12451d30f4c`
    );
    const eps = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/${companySymbol}/earnings/1/actualEPS?token=Tpk_139c39f1edae43fc8e5ab12451d30f4c`
    )
    changeNullValues(res.data)
    stockData = {
      previousClose: res.data.previousClose,
      high: res.data.high,
      low: res.data.low,
      dayRange: res.data.low + '-' + res.data.high,
      previousVolume: res.data.previousVolume,
      marketCap: res.data.marketCap,
      peRatio: res.data.peRatio,
      open: res.data.open,
      week52High: res.data.week52High,
      week52Low: res.data.week52Low,
      week52Range: res.data.week52Low + '-' + res.data.week52High,
      avgTotalVolume: res.data.avgTotalVolume,
      earningsPerShare: eps.data,
      ytdChange: res.data.ytdChange
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
