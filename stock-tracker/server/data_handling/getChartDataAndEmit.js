const axios = require("axios");

const requestChartDataPromise = (HOST, TOKEN) => async (
  stockSymbol,
  chartTime
) => {
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
    return { isError: false, payload: chart };
  } catch (error) {
    console.error(`Chart Data Error: ${error}`);
    return { isError: true };
  }
};

exports.requestChartDataPromise = requestChartDataPromise;
