import React, { useState } from 'react';

const SearchBar = ({addSymbol}) => {
  const [symbol, setSymbol] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addSymbol(symbol)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
          <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}
export default SearchBar;