import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSymbolAction } from './redux';

const io = require('socket.io-client')
const socket = io('http://127.0.0.1:5000')

const SearchBar = () => {
  // let symbol;
  const [symbol, setSymbol] = useState("")
  const dispatch = useDispatch()
  const addSymbol = (symbol) => dispatch(addSymbolAction(symbol))


  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol.trim() === '' ) return;
    addSymbol({
      symbol: symbol
    })
    socket.emit("symbol", symbol)
    setSymbol('');
    // addSymbol(symbol)
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