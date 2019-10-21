import React from "react";
import { Icon } from "antd";
import "../assets/styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="usMarket">
        <p className="footer1">US MARKET</p>
        <p className="footer2">
          <span className="footer__heading">NASDAQ </span>
          <sup>$</sup>6,850.05
          <span className="green">
            <sup>
              <Icon type="arrow-up"></Icon>
            </sup>
            72.89 | 1.08<sup>%</sup>
          </span>
          <span className="footer__heading">DJIA </span>
          <sup>$</sup>23,026.35
          <span className="green">
            <sup>
              <Icon type="arrow-up"></Icon>
            </sup>
            168.89 | 0.7<sup>%</sup>
          </span>
          <span className="footer__heading">S&P </span>
          <sup>$</sup>2,605.35
          <span className="green">
            <sup>
              <Icon type="arrow-up"></Icon>
            </sup>
            23.35 | 0.94<sup>%</sup>
          </span>
        </p>
      </div>
      <div className="favorites">
        <p className="footer1">FAVORITES</p>
        <p className="footer2">
          <span className="footer__heading">MSFT </span>
          <sup>$</sup>86.92
          <span className="green">
            <sup>
              <Icon type="arrow-up"></Icon>
            </sup>
            1.91 | 2.25<sup>%</sup>
          </span>
          <span className="footer__heading">AAPL </span>
          <sup>$</sup>160.03
          <span className="red">
            <sup>
              <Icon type="arrow-down"></Icon>
            </sup>
            2.94 | 1.88<sup>%</sup>
          </span>
          <span className="footer__heading">GOOG </span>
          <sup>$</sup>1,017.49
          <span className="green">
            <sup>
              <Icon type="arrow-up"></Icon>
            </sup>
            15.97 | 1.59<sup>%</sup>
          </span>
        </p>
      </div>
    </div>
  );
};
export default Footer;
