import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSymbolAction } from '../store/actions';
import logo from '../assets/logo.png';

const Header = () => {
  const [symbol, setSymbol] = useState("")
  const dispatch = useDispatch()
  const addSymbol = useCallback((symbol) => dispatch(addSymbolAction(symbol)), [dispatch])
  const response = useSelector((state) => state.response)
  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (symbol.trim() === '') return;
      addSymbol(symbol)
      setSymbol('');
    }
  }
  return (
    <>
    <div className="headerContainer">
      <img className="logo" alt="logo" src={logo}/>
      <div className="HeaderBtns">
        <button className="headerBtn quotesBtn">QUOTES</button>
        <button className="headerBtn">MARKETS</button>
        <button className="headerBtn">WATCHLIST</button>
      </div>
    </div>
      <div className="searchDisplay">
        <input className="searchBar" placeholder={response ? `${response.companyName} (${response.symbol})` : ""} type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} onKeyPress={handleSubmit} />
        <div className="priceDisplay">
          <h3>{response.latestPrice}</h3>
          <h3>{response.change}</h3>
          <h3>{response.changePercent}</h3>
        </div>
      </div>
    </>
  )
}
export default Header;