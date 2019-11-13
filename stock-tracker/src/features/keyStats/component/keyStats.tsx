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

  return (
    <div className="keystats">
      <h1>KEY STATS</h1>
      {error ? (
        <ErrorMessage feature="Key stats" />
      ) : loading ? (
        <Loading />
      ) : (
        <div className="keystats__grid">
          <table className="keystats__grid__display1">
            <tbody>
              <KeyStatsRow
                label="Previous Close"
                value={
                  response && response.previousClose
                    ? twoDecimalPlaces(response.previousClose)
                    : "N/A"
                }
              />
              <KeyStatsRow
                label="Day Range"
                value={
                  response && response.high && response.low
                    ? `${twoDecimalPlaces(response.high)}-${twoDecimalPlaces(
                        response.low
                      )}`
                    : "N/A"
                }
              />
              <KeyStatsRow
                label="Volume"
                value={
                  response && response.previousVolume
                    ? numberWithCommas(response.previousVolume)
                    : "N/A"
                }
              />
              <KeyStatsRow
                label="Market Cap"
                value={
                  response && response.marketCap
                    ? numberWithCommas(response.marketCap)
                    : "N/A"
                }
              />
              <KeyStatsRow
                label="P/E Ratio"
                value={
                  response && response.peRatio
                    ? twoDecimalPlaces(response.peRatio)
                    : "N/A"
                }
              />
            </tbody>
          </table>
          <table className="keystats__grid__display2">
            <tbody>
              <KeyStatsRow
                label="Open"
                value={
                  response && response.open
                    ? twoDecimalPlaces(response.open)
                    : "N/A"
                }
              />
              <KeyStatsRow
                label="52 Week Range"
                value={
                  response && response.week52High && response.week52Low
                    ? `${twoDecimalPlaces(
                        response.week52High
                      )}-${twoDecimalPlaces(response.week52Low)}`
                    : "N/A"
                }
              />
              <KeyStatsRow
                label="Total Avg Volume"
                value={
                  response && response.avgTotalVolume
                    ? numberWithCommas(response.avgTotalVolume)
                    : "N/A"
                }
              />
              <KeyStatsRow
                label="Earning Per Share"
                value={
                  response && response.earningsPerShare
                    ? twoDecimalPlaces(response.earningsPerShare)
                    : "N/A"
                }
              />
              <KeyStatsRow
                label="Dividend & Yield"
                value={
                  response && response.ytdChange
                    ? `${twoDecimalPlaces(response.ytdChange)}%`
                    : "N/A"
                }
              />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
