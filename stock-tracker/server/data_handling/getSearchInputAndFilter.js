const getSearchInputAndFilter = async (socket, searchInput, stockCompanies) => {
  try {
    const companies = await stockCompanies;
    const suggestedCompanies = companies.filter(
      company =>
        company.symbol.toLowerCase().indexOf(searchInput.toLowerCase()) !==
          -1 ||
        company.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
    );

    const suggestions = suggestedCompanies.map(data => ({
      symbol: data.symbol,
      name: data.name,
      exchange: data.exchange
    }));

    suggestions.sort((a, b) => {
      const aStart = a.symbol.match(new RegExp("^" + searchInput, "i")) || [];
      const bStart = b.symbol.match(new RegExp("^" + searchInput, "i")) || [];

      if (aStart.length !== bStart.length) return bStart.length - aStart.length;
      else return a.symbol > b.symbol ? 1 : -1;
    });
    const autocomplete = suggestions.slice(0, 10);

    socket.emit("suggestions", autocomplete);
  } catch (error) {
    console.error(`Search Error: ${error}`);
  }
};
exports.getSearchInputAndFilter = getSearchInputAndFilter;
