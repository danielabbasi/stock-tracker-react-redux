import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSymbolAction, addSearchInputAction } from "../store/actions";
import logo from "../assets/logo.png";
import { Icon } from "antd";
import "../Header.css";
import Select from 'react-select';

const moment = require("moment");

const Header = () => {
  const [symbol, setSymbol] = useState("");
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const addSymbol = useCallback(symbol => dispatch(addSymbolAction(symbol)), [
    dispatch
  ]);
  const addSearchInput = useCallback(searchInput => dispatch(addSearchInputAction(searchInput)), [
    dispatch
  ]);
  const response = useSelector(state => state.response);
  const overview = useSelector(state => state.companyOverview);
  const suggestions = useSelector(state => state.suggestions)
  const handleSubmit = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (symbol.trim() === "") return;
      addSymbol(symbol);
      setSymbol("");
    }
  };

  const onChange = e => {
    setSymbol(e.target.value)
    addSearchInput(e.target.value)
  }

  useEffect(() => {
    setOpen(suggestions !== 0)
  }, [suggestions])

  const getSuggestions = suggestions ? suggestions.map(data => {
    return (
      <li value={data.symbol} key={data.symbol}> {`${data.name} (${data.symbol})`} </li>
    )
  }) : ''

  const changeNo =
    response.change === 0
      ? "0"
      : Math.abs(Math.round(response.change * 100) / 100);
  const changePercentNo = Math.abs((response.changePercent * 100).toFixed(2));

  const marketStatus = response
    ? response.isUSMarketOpen
      ? "Market Open"
      : "Market Closed"
    : "";
  const formatedTime = moment(response.latestUpdate).format("hh:mm A");
  const realTimeDisplay = response
    ? `Real time price as of ${response.latestTime} ${formatedTime}`
    : "";

  return (
    <div className="header">
      <img className="logo" alt="logo" src={logo} />
      <div className="headerBtns">
        <button className="headerBtn quotesBtn">QUOTES</button>
        <button className="headerBtn">MARKETS</button>
        <button className="headerBtn">WATCHLIST</button>
      </div>
      <div className="searchDisplay">
        <h5>
          <Icon className="searchIcon" type="search" />
        </h5>
        <input
          className="searchBar"
          placeholder={
            response ? `${response.companyName}(${response.symbol})` : ""
          }
          type="text"
          value={symbol}
          onChange={onChange}
          onKeyPress={handleSubmit}
        />
        <ul className='suggestion_list' style={{display: open ? 'block' : 'none'}}>{getSuggestions}</ul>
      </div>
      <div className="priceDisplay">
        <p className="smallIcon">{response ? "$" : ""}</p>
        <h4>{response.latestPrice}</h4>
        <h4
          className={
            response
              ? response.change < 0
                ? "priceDecrease"
                : "priceIncrease"
              : "hidden"
          }
        >
          <Icon
            className={response ? "smallIcon" : "hideIcon"}
            type={response.change < 0 ? "arrow-down" : "arrow-up"}
          />
          {changeNo}
        </h4>
        <h4
          className={
            response
              ? response.changePercent < 0
                ? "priceDecrease"
                : "priceIncrease"
              : "hidden"
          }
        >
          {changePercentNo}
        </h4>
        <p
          className={
            response.changePercent < 0
              ? "smallIcon priceDecrease"
              : "smallIcon priceIncrease"
          }
        >
          {response ? "%" : ""}
        </p>
      </div>
      <div className={response ? "currencyDisplay" : "hidden"}>
        <p className="curDisplayP">{overview.exchange}</p>
        <p className="curDisplayP">{overview.industry}</p>
        <p className={response.currency ? "curDisplayP" : "hidden"}>
          {response.currency}
        </p>
      </div>
      <div className="marketStatusDisplay">
        <p className="realTime">{realTimeDisplay}</p>
        <p className="marketStatus">{marketStatus}</p>
      </div>
    </div>
  );
};
export default Header;