const getSearchInputAndFilter = async (socket, input, stockCompanies) => {
  try {
    const companies = await stockCompanies;
    const searchInput = input.toLowerCase();
    const suggestedCompanies = companies.filter(
      company =>
        company.symbol.toLowerCase().indexOf(searchInput) !== -1 ||
        company.name.toLowerCase().indexOf(searchInput) !== -1
    );

    const suggestions = suggestedCompanies.map(data => ({
      symbol: data.symbol,
      name: data.name,
      exchange: data.exchange
    }));

    suggestions.sort((a, b) => {
      // returns an array of matched symbols to search input (symbols which start with the search input)
      const aStart = a.symbol.match(new RegExp("^" + searchInput, "i")) || [];
      const bStart = b.symbol.match(new RegExp("^" + searchInput, "i")) || [];

      // put symbols with the shortest length at a lower index of the list (first)
      if (aStart.length !== bStart.length) return bStart.length - aStart.length;
      // put into alphabetical order
      else return a.symbol > b.symbol ? 1 : -1;
    });
    const autocomplete = suggestions.slice(0, 10);

    socket.emit("suggestions", autocomplete);
  } catch (error) {
    console.error(`Search Error: ${error}`);
  }
};
exports.getSearchInputAndFilter = getSearchInputAndFilter;
