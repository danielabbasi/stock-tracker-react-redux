import React from "react";
import { useSelector } from "react-redux";
import Loading from "./loading";
import "../assets/styles/KeyStats.css";

const KeyStats = () => {
  const response = useSelector(state => state.response);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error.stockData);

  const earningsPShare =
    typeof response.earningsPerShare === "object"
      ? "N/A"
      : // ? Object.values(response.earningsPerShare)
        response.earningsPerShare;

  return (
    <div className="keystats">
      <h1>KEY STATS</h1>
      {error ? (
        <p className="error__message">Error: Key stats can not be displayed</p>
      ) : loading > 0 && !response ? (
        <Loading />
      ) : (
        <div className="keystats__grid">
          <table className="keystats__grid__display1">
            <tbody>
              <tr>
                <td className="keystats__grid__display1__name">
                  Previous Close
                </td>
                <td className="keystats__grid__display1__value">
                  {response.previousClose}
                </td>
              </tr>
              <tr>
                <td className="keystats__grid__display1__name">Day Range</td>
                <td className="keystats__grid__display1__value">
                  {response.dayRange}
                </td>
              </tr>
              <tr>
                <td className="keystats__grid__display1__name">Volume</td>
                <td className="keystats__grid__display1__value">
                  {response.previousVolume}
                </td>
              </tr>
              <tr>
                <td className="keystats__grid__display1__name">Market Cap</td>
                <td className="keystats__grid__display1__value">
                  {response.marketCap}
                </td>
              </tr>
              <tr>
                <td className="keystats__grid__display1__name">Market Cap</td>
                <td className="keystats__grid__display1__value">
                  {response.marketCap}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="keystats__grid__display2">
            <tbody>
              <tr>
                <td className="keystats__grid__display1__name">Open</td>
                <td className="keystats__grid__display1__value">
                  {response.open}
                </td>
              </tr>
              <tr>
                <td className="keystats__grid__display1__name">
                  52 Week Range
                </td>
                <td className="keystats__grid__display1__value">
                  {response.week52Range}
                </td>
              </tr>
              <tr>
                <td className="keystats__grid__display1__name">
                  Total Avg Volume
                </td>
                <td className="keystats__grid__display1__value">
                  {response.avgTotalVolume}
                </td>
              </tr>
              <tr>
                <td className="keystats__grid__display1__name">
                  Earning Per Share
                </td>
                <td className="keystats__grid__display1__value">
                  {earningsPShare}
                </td>
              </tr>
              <tr>
                <td className="keystats__grid__display1__name">
                  Dividend & Yield
                </td>
                <td className="keystats__grid__display1__value">
                  {response.ytdChange !== undefined &&
                  response.ytdChange !== "N/A"
                    ? Math.abs(response.ytdChange.toFixed(2)) + "%"
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default KeyStats;
