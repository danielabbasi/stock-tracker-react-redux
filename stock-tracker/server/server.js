const HOST = "https://sandbox.iexapis.com";
const TOKEN = "Tpk_139c39f1edae43fc8e5ab12451d30f4c";
module.exports = { HOST, TOKEN };
const { HANDLE_DATA } = require("./data_handling/handleData");
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const IO = socketIo(server);

IO.on("connection", socket => HANDLE_DATA(socket));

server.listen(port, () => console.info(`server is listening on port: ${port}`));

