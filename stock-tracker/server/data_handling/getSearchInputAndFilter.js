const getSearchInputAndFilter = async (socket, searchInput, stockCompanies) => {
  try {
    const companies = await stockCompanies;
    const suggestedCompanies = companies.filter(company => company.symbol.toLowerCase().indexOf(searchInput.toLowerCase()) !==
      -1 ||
      company.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1)
      .slice(0, 10);
    const suggestions = suggestedCompanies.map(data => ({
      symbol: data.symbol,
      name: data.name,
      exchange: data.exchange
    }));
    socket.emit("suggestions", suggestions);
  }
  catch (error) {
    console.error(`Search Error: ${error}`);
  }
};
exports.getSearchInputAndFilter = getSearchInputAndFilter;
