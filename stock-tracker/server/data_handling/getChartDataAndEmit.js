const axios = require("axios");;
const {HOST} = require('../server')
const {TOKEN} = require('../server')

const getChartDataAndEmit = async (socket, stockSymbol, chartTime) => {
  try {
    const chartData = await axios.get(`${HOST}/stable/stock/${stockSymbol}/chart/${chartTime}?token=${TOKEN}`);
    let chart;
    if (chartTime === "1D") {
      chart = chartData.data.map(data => ({
        close: data.close,
        date: data.label
      }));
    }
    else {
      chart = chartData.data.map(data => ({
        close: data.close,
        date: data.date
      }));
    }
    socket.emit("ChartData", chart);
  }
  catch (error) {
    socket.emit("ChartDataError", error);
    console.error(`Chart Data Error: ${error}`);
  }
};
exports.getChartDataAndEmit = getChartDataAndEmit;
