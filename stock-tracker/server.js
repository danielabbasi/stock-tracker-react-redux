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
      `https://cloud.iexapis.com/stable/stock/${companySymbol}/quote?token=sk_dd6836ca1e944b129d969b57482a7c64`
    );
    changeNullValues(res.data)
    socket.emit("FromAPI", res.data); // Emitting a new message. It will be consumed by the client
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
