import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSymbolAction } from "../../search/redux/actions";
import logo from "../assets/logo.png";
import { Icon } from "antd";
import "./Header.css";
import Search from "../../search/component/Search";
import MarketStatus from "./marketStatus"

const Header = () => {
  const response = useSelector(state => state.keyStats.response);
  const overview = useSelector(state => state.overview.companyOverview);
  const dispatch = useDispatch();
  const addSymbol = useCallback(symbol => dispatch(setSymbolAction(symbol)), [
    dispatch
  ]);
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
      <MarketStatus />
    </div>
  );
};
export default Header;
