import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSymbolAction } from "../../search/redux/actions";
import logo from "../assets/logo.png";
import { Icon } from "antd";
import "./Header.css";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";
import Search from "../../search/component/Search";
const moment = require("moment");

const Header = () => {
  const response = useSelector(state => state.keyStats.response);
  const overview = useSelector(state => state.overview.companyOverview);
  const dispatch = useDispatch();
  const addSymbol = useCallback(symbol => dispatch(setSymbolAction(symbol)), [
    dispatch
  ]);
  const marketStatus = response
    ? response.isUSMarketOpen
      ? "Market Open"
      : "Market Closed"
    : "";
  const realTimeDisplay = response
    ? `Real-Time Price as of ${response.latestTime} ${
        response.latestUpdate
          ? moment(response.latestUpdate).format("hh:mm A")
          : ""
      } EST`
    : "";

  const statusIcon = response
    ? marketStatus === "Market Open"
      ? sun
      : moon
    : "";
  const onClick = () => {
    addSymbol("");
  };
  return (
    <div className="header">
      <img onClick={onClick} className="header__logo" alt="logo" src={logo} />
      <div className="header__btns">
        <button className="header__btns__btn header__btns__btn--active">
          QUOTES
        </button>
        <button className="header__btns__btn">MARKETS</button>
        <button className="header__btns__btn">WATCHLIST</button>
      </div>
      <Search />
      <div className="price_display">
        <p className="price_display__small_icon">{response ? "$" : ""}</p>
        <h4>{response ? response.latestPrice : ""}</h4>
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
          {response.change ? Math.abs(response.change.toFixed(2)) : ""}{" "}
          <span className="separator">|</span>
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
          {response.changePercent
            ? Math.abs(response.changePercent.toFixed(2))
            : ""}
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
        <ul>
          <li className="currency_display__item currency_display__item__exchange">
            {overview.exchange}
          </li>
          <li className="currency_display__item currency_display__item__industry">
            {overview.industry}
          </li>
          <li
            className={
              response.currency
                ? "currency_display__item currency_display__item__currency"
                : "hidden"
            }
          >
            {response.currency}
          </li>
        </ul>
      </div>
      <div className="market_status_display">
        <p className="market_status_display__real_time">{realTimeDisplay}</p>
        <img className="market_status__icon" src={statusIcon} />
        <p className="market_status_display__real_time__status">
          {marketStatus}
        </p>
      </div>
    </div>
  );
};
export default Header;
