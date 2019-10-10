import React from "react";
import { useSelector } from "react-redux";
import Loading from "./loading";

const KeyStats = () => {
  const response = useSelector(state => state.response);
  const loading = useSelector(state => state.loading);

  if (loading > 0 && !response) {
    return (
      <div className="keystats">
        <h3>KEY STATS</h3>
        <Loading />
      </div>
    );
  }
  return (
    <div className="keystats">
      <h3>KEY STATS</h3>
      <div className="keystats__grid">
        <table className="keystats__grid__display1">
          <tbody>
            <tr>
              <td className="keystats__grid__display1__name">Previous Close</td>
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
              <td className="keystats__grid__display1__name">52 Week Range</td>
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
                {response.earningsPerShare}
              </td>
            </tr>
            <tr>
              <td className="keystats__grid__display1__name">
                Dividend & Yield
              </td>
              <td className="keystats__grid__display1__value">
                {response ? response.ytdChange + "%" : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default KeyStats;
