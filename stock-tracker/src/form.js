import React, { useState } from 'react';

const SearchBar = ({addSymbol}) => {
  let symbol;
  const handleSubmit = (e) => {
    e.preventDefault();
    addSymbol(symbol)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
          <input type="text" value={symbol} onChange={(e) => symbol = e.target.value} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}
export default SearchBar;