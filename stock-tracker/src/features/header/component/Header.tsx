import React, { useCallback, FC } from "react";
import { useDispatch } from "react-redux";
import { setSymbolAction, Search } from "../../search";
import logo from "../assets/logo.png";
import "./Header.css";
import {
  MarketStatus,
  CurrencyDisplay,
  PriceDisplay,
  HeaderButtons
} from "../index";

export const Header: FC = () => {
  const dispatch = useDispatch();
  const addSymbol = useCallback(
    (symbol: string) => dispatch(setSymbolAction(symbol)),
    [dispatch]
  );
  const onClick: React.MouseEventHandler<HTMLImageElement> = () => {
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
