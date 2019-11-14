const axios = require("axios");
const { HOST } = require("./constants");
const TOKEN = process.env.TOKEN;

const getCompaniesFromAPI = async socket => {
  try {
    const res = await axios.get(
      `${HOST}/stable/ref-data/symbols?token=${TOKEN}`
    );
    const companies = res.data.map(data => ({
      name: data.name,
      symbol: data.symbol,
      exchange: data.exchange
    }));
    socket.emit("companies", companies);
    return companies;
  } catch (error) {
    socket.emit("CompaniesError", error);
    console.error(`Companies Error: ${error}`);
  }
};
exports.getCompaniesFromAPI = getCompaniesFromAPI;
