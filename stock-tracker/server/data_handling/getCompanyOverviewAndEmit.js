const axios = require("axios");

const getCompanyOverviewAndEmit = (HOST, TOKEN) => async stockSymbol => {
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
    return { isError: false, data: overview };
  } catch (error) {
    console.error(`Company Overview Error: ${error}`);
    return { isError: true };
  }
};

exports.getCompanyOverviewAndEmit = getCompanyOverviewAndEmit;
