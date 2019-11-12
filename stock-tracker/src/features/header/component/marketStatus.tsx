import React, { FC } from "react";
import { useSelector } from "react-redux";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";
import moment from "moment";
import { AppState } from "store/rootReducer";

export const MarketStatus: FC = () => {
  const response = useSelector((state: AppState) => state.keyStats.response);

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

  return (
    <div className="market_status_display">
      <p className="market_status_display__real_time">{realTimeDisplay}</p>
      <img className="market_status__icon" src={statusIcon} />
      <p className="market_status_display__real_time__status">{marketStatus}</p>
    </div>
  );
};
