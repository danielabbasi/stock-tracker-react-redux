import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Loading } from "../../loading/component/loading";
import { ErrorMessage } from "../../error/error";
import "./KeyStats.css";
import { AppState } from "store/rootReducer";
import { KeyStatsRow } from "./keyStatsRow";

const numberWithCommas = (stats: number) => {
  return stats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const twoDecimalPlaces = (stats: number) => {
  return Math.abs(stats).toFixed(2);
};

export const KeyStats: FC = () => {
  const { response, loading, error } = useSelector(
    (state: AppState) => state.keyStats
  );
  const keyStatsData = {
    "Previous Close":
      response && response.previousClose
        ? twoDecimalPlaces(response.previousClose)
        : "N/A",
    "Day Range":
      response && response.high && response.low
        ? `${twoDecimalPlaces(response.high)}-${twoDecimalPlaces(response.low)}`
        : "N/A",
    Volume:
      response && response.previousVolume
        ? numberWithCommas(response.previousVolume)
        : "N/A",
    "Market Cap":
      response && response.marketCap
        ? numberWithCommas(response.marketCap)
        : "N/A",
    "P/E Ratio":
      response && response.peRatio ? twoDecimalPlaces(response.peRatio) : "N/A",

    Open: response && response.open ? twoDecimalPlaces(response.open) : "N/A",
    "52 Week Range":
      response && response.week52High && response.week52Low
        ? `${twoDecimalPlaces(response.week52High)}-${twoDecimalPlaces(
            response.week52Low
          )}`
        : "N/A",
    "Total Avg Volume":
      response && response.avgTotalVolume
        ? numberWithCommas(response.avgTotalVolume)
        : "N/A",
    "Earning Per Share":
      response && response.earningsPerShare
        ? twoDecimalPlaces(response.earningsPerShare)
        : "N/A",
    "Dividend & Yield":
      response && response.ytdChange
        ? `${twoDecimalPlaces(response.ytdChange)}%`
        : "N/A"
  };

  return (
    <div className="keystats">
      <h1>KEY STATS</h1>
      {error ? (
        <ErrorMessage feature="Key stats" />
      ) : loading ? (
        <Loading />
      ) : (
        <div className="keystats__display">
          <table className="keystats__display__table">
            <tbody>
              {Object.entries(keyStatsData).map(([key, value]) => (
                <KeyStatsRow label={key} value={value} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
