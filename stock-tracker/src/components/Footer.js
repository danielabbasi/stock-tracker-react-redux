import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="usMarket">
        <p className="footer1">US MARKET</p>
        <p className="footer2">
          NASDAQ 6.850.05 <span className="green">165.89|0.7</span> S&P 2.605.35{" "}
          <span className="green">23.35|0.94</span>
        </p>
      </div>
      <div className="favorites">
        <p className="footer3">FAVORITES</p>
        <p className="footer4">
          MSFT 86.92 <span className="green">1.91|2.25</span> AAPL 160.03{" "}
          <span className="red">2.94|1.88</span> GOOG 1.017.49{" "}
          <span className="green">15.97|1.59</span>
        </p>
      </div>
    </div>
  );
};
export default Footer;
