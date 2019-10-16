import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSymbolAction, addSearchInputAction } from "../store/actions";
import logo from "../assets/logo.png";
import { Icon } from "antd";
import "../assets/styles/Header.css";
import sun from "../assets/sun.png"
import moon from "../assets/moon.png"
const moment = require("moment");

const Header = () => {
  const [symbol, setSymbol] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const addSymbol = useCallback(symbol => dispatch(addSymbolAction(symbol)), [
    dispatch
  ]);
  const addSearchInput = useCallback(
    searchInput => dispatch(addSearchInputAction(searchInput)),
    [dispatch]
  );
  const response = useSelector(state => state.response);
  const overview = useSelector(state => state.companyOverview);
  const suggestions = useSelector(state => state.suggestions);
  const handleSubmit = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (symbol.trim() === "") return;
      addSymbol(symbol);
      setOpen(false);
      setSymbol("");
    }
  };

  const onChange = e => {
    setSymbol(e.target.value);
    addSearchInput(e.target.value);
  };

  const onClick = e => {
    addSymbol(e.target.id);
    setOpen(false);
    setSymbol("");
  };

  const handleBlur = () => {
    requestAnimationFrame(() => {
      if (
        !dropdownRef.current.contains(document.activeElement) &&
        !searchRef.current.contains(document.activeElement)
      ) {
        setOpen(false);
      } else {
        searchRef.current.focus();
      }
    });
  };

  useEffect(() => {
    setOpen(suggestions !== 0);
  }, [suggestions]);

  const suggestionItems =
    suggestions.length > 0
      ? suggestions.map(data => {
          return (
            <li
              className="search_display__suggestion_list__item"
              onClick={onClick}
              id={data.symbol}
              key={data.symbol}
            >
              <p className="search_display__suggestion_list__item__symbol">{`(${data.symbol}) `}</p>
              {` ${data.name}`}
            </li>
          );
        })
      : "";

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

    const statusIcon = response
    ? marketStatus === "Market Open"
      ? sun
      : moon
    : ""

  return (
    <div className="header">
      <img className="header__logo" alt="logo" src={logo} />
      <div className="header__btns">
        <button className="header__btns__btn quotes_btn">QUOTES</button>
        <button className="header__btns__btn">MARKETS</button>
        <button className="header__btns__btn">WATCHLIST</button>
      </div>
      <div className="search_display">
        <h5>
          <Icon className="search_display__icon" type="search" />
        </h5>
        <input
          className="search_display__search_bar"
          placeholder={
            response ? `${response.companyName}(${response.symbol})` : ""
          }
          type="text"
          value={symbol}
          onChange={onChange}
          onKeyPress={handleSubmit}
          onBlur={handleBlur}
          ref={searchRef}
        />
        <ul
          ref={dropdownRef}
          tabIndex="-1"
          className="search_display__suggestion_list"
          style={{ display: open ? "block" : "none" }}
        >
          {suggestionItems}
        </ul>
      </div>
      <div className="price_display">
        <p className="price_display__small_icon">{response ? "$" : ""}</p>
        <h4>{response.latestPrice}</h4>
        <h4
          className={
            response
              ? response.change < 0
                ? "price_display--decrease"
                : "price_display--increase"
              : "hidden"
          }
        >
          <Icon
            className="price_display__arrow_icon"
            type={response.change < 0 ? "arrow-down" : "arrow-up"}
          />
          {changeNo} |
        </h4>
        <h4
          className={
            response
              ? response.changePercent < 0
                ? "price_display--decrease"
                : "price_display--increase"
              : "hidden"
          }
        >
          {changePercentNo}
        </h4>
        <p
          className={
            response.changePercent < 0
              ? "price_display__small_icon price_display--decrease"
              : "price_display__small_icon price_display--increase"
          }
        >
          {response ? "%" : ""}
        </p>
      </div>
      <div className={response ? "currency_display" : "hidden"}>
        <p className="currency_display__item">{overview.exchange}</p>
        <p className="currency_display__item">{overview.industry}</p>
        <p className={response.currency ? "currency_display__item" : "hidden"}>
          {response.currency}
        </p>
      </div>
      <div className="market_status_display">
        <p className="market_status_display__real_time">{realTimeDisplay}</p>
        <img className="market_status__icon" src={statusIcon}/>
        <p className="market_status_display__real_time__status">
          {marketStatus}
        </p>
      </div>
    </div>
  );
};
export default Header;
