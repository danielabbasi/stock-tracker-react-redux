import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSymbolAction } from "../../search/redux/actions";
import logo from "../assets/logo.png";
import "./Header.css";
import Search from "../../search/component/Search";
import MarketStatus from "./marketStatus";
import CurrencyDisplay from "./currencyDisplay"
import PriceDisplay from "./priceDisplay";
import HeaderButtons from "./headerButtons"

const Header = () => {
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
      <HeaderButtons />
      <Search />
      <PriceDisplay />
      <CurrencyDisplay />
      <MarketStatus />
    </div>
  );
};
export default Header;
