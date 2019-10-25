import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSymbolAction } from "../../../store/actions";
import logo from "../assets/logo.png";
import { Icon } from "antd";
import "./Header.css";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";
import Search from "../../search/component/Search";
const moment = require("moment");

const Header = () => {
  const response = useSelector(state => state.response);
  const overview = useSelector(state => state.companyOverview);
  const dispatch = useDispatch();
  const addSymbol = useCallback(symbol => dispatch(addSymbolAction(symbol)), [
    dispatch
  ]);
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
    ? `Real-Time Price as of ${response.latestTime} ${formatedTime} EST`
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
          {changeNo} <span className="separator">|</span>
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
