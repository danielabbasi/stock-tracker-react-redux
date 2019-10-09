import React from "react";
import { useSelector } from "react-redux";

const KeyStats = () => {
  const response = useSelector(state => state.response);
  return (
    <div className="keystats">
      <h3>KEY STATS</h3>
      <div className="keystatsGrid">
        <table className="keystatsDisplay1">
          <tbody>
            <tr>
              <td className="keyStats-name">Previous Close</td>
              <td className="keyStats-value">{response.previousClose}</td>
            </tr>
            <tr>
              <td className="keyStats-name">Day Range</td>
              <td className="keyStats-value">{response.dayRange}</td>
            </tr>
            <tr>
              <td className="keyStats-name">Volume</td>
              <td className="keyStats-value">{response.previousVolume}</td>
            </tr>
            <tr>
              <td className="keyStats-name">Market Cap</td>
              <td className="keyStats-value">{response.marketCap}</td>
            </tr>
            <tr>
              <td className="keyStats-name">Market Cap</td>
              <td className="keyStats-value">{response.marketCap}</td>

            </tr>
          </tbody>
        </table>
        <table className="keystatsDisplay2">
          <tbody>
            <tr>
              <td className="keyStats-name">Open</td>
              <td className="keyStats-value">{response.open}</td>
            </tr>
            <tr>
              <td className="keyStats-name">52 Week Range</td>
              <td className="keyStats-value">{response.week52Range}</td>
            </tr>
            <tr>
              <td className="keyStats-name">Total Avg Volume</td>
              <td className="keyStats-value">{response.avgTotalVolume}</td>
            </tr>
            <tr>
              <td className="keyStats-name">Earning Per Share</td>
              <td className="keyStats-value">{response.earningsPerShare}</td>
            </tr>
            <tr>
              <td className="keyStats-name">Dividend & Yield</td>
              <td className="keyStats-value">
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
