import React from "react";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { Icon } from "antd";
import "../assets/styles/Header.css";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";
import Search from "./Search";
const moment = require("moment");

const Header = () => {
  const response = useSelector(state => state.response);
  const overview = useSelector(state => state.companyOverview);
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
    : "";
  return (
    <div className="header">
      <img className="header__logo" alt="logo" src={logo} />
      <div className="header__btns">
        <button className="header__btns__btn quotes_btn">QUOTES</button>
        <button className="header__btns__btn">MARKETS</button>
        <button className="header__btns__btn">WATCHLIST</button>
      </div>
      <div className="header__search_price_container">
        <Search />
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
        <img className="market_status__icon" src={statusIcon} />
        <p className="market_status_display__real_time__status">
          {marketStatus}
        </p>
      </div>
    </div>
  );
};
export default Header;
