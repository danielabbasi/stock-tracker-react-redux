const axios = require("axios");
const { HOST, CHART_DATA } = require("./constants");
const TOKEN = process.env.TOKEN;

const getChartDataAndEmit = async (socket, stockSymbol, chartTime) => {
  try {
    const chartData = await axios.get(
      `${HOST}/stable/stock/${stockSymbol}/chart/${chartTime}?token=${TOKEN}`
    );
    let chart;
    if (chartTime === "1D") {
      chart = chartData.data.map(data => ({
        close: data.close,
        date: data.label
      }));
    } else {
      chart = chartData.data.map(data => ({
        close: data.close,
        date: data.date
      }));
    }
    socket.emit(CHART_DATA, { data: chart });
  } catch (error) {
    socket.emit(CHART_DATA, { isError: true });
    console.error(`Chart Data Error: ${error}`);
  }
};

exports.getChartDataAndEmit = getChartDataAndEmit;
