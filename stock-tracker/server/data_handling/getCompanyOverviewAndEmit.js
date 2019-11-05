const axios = require("axios");
const { HOST, COMPANY_OVERVIEW } = require("./constants");
const TOKEN = process.env.TOKEN;

const getCompanyOverviewAndEmit = async (socket, stockSymbol) => {
  try {
    const companyOverview = await axios.get(
      `${HOST}/stable/stock/${stockSymbol}/company?token=${TOKEN}`
    );
    const {
      companyName,
      symbol,
      exchange,
      industry,
      website,
      description
    } = companyOverview.data;
    const overview = {
      companyName,
      symbol,
      exchange,
      industry,
      website,
      description
    };
    socket.emit(COMPANY_OVERVIEW, { data: overview });
  } catch (error) {
    socket.emit(COMPANY_OVERVIEW, { isError: true });
    console.error(`Company Overview Error: ${error}`);
  }
};

exports.getCompanyOverviewAndEmit = getCompanyOverviewAndEmit;
