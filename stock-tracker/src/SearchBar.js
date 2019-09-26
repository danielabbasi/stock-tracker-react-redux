import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSymbolAction } from './redux';

const SearchBar = () => {
  const [symbol, setSymbol] = useState("")
  const dispatch = useDispatch()
  const addSymbol = useCallback((symbol) => dispatch(addSymbolAction(symbol)), [dispatch])
  const response = useSelector((state) => state.response);

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (symbol.trim() === '') return;
      addSymbol(symbol)
      setSymbol('');
    }
  }
  return (
    // add data
    <input placeholder={response ? `${response.companyName} (${response.symbol})` : ""} type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} onKeyPress={handleSubmit} />
  )
}
export default SearchBar;