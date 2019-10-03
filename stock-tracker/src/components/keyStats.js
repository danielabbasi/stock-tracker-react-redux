import React from 'react';
import { useSelector } from 'react-redux';

const KeyStats = () => {
    const response = useSelector((state) => state.response)
    return (
            <div className="keystats">
                <h3>KEY STATS</h3>
                <table className="keystatsDisplay">
                    <tr>
                        <td className="keyStats-name">Previous Close</td>
                        <td className="keyStats-value">{response.previousClose}</td>
                        <td className="keyStats-name">Open</td>
                        <td className="keyStats-value">{response.open}</td>
                    </tr>
                    <tr>
                        <td className="keyStats-name">Day Range</td>
                        <td className="keyStats-value">{response.dayRange}</td>
                        <td className="keyStats-name">52 Week Range</td>
                        <td className="keyStats-value">{response.week52Range}</td>
                    </tr>
                    <tr>
                        <td className="keyStats-name">Volume</td>
                        <td className="keyStats-value">{response.previousVolume}</td>
                        <td className="keyStats-name">Total Avg Volume</td>
                        <td className="keyStats-value">{response.avgTotalVolume}</td>
                    </tr>
                    <tr>
                        <td className="keyStats-name">Market Cap</td>
                        <td className="keyStats-value">{response.marketCap}</td>
                        <td className="keyStats-name">Earning Per Share</td>
                        <td className="keyStats-value">{response.earningsPerShare}</td>
                    </tr>
                    <tr>
                        <td className="keyStats-name">Market Cap</td>
                        <td className="keyStats-value">{response.marketCap}</td>
                        <td className="keyStats-name">Dividend & Yield</td>
                        <td className="keyStats-value">{response ? response.ytdChange + "%" : ""}</td>
                    </tr>
                </table>
            {/* <h2>KEY STATS</h2>
                <ul className="keyStats-li1"> */}
                    {/* <li>
                        <p className="keyStats-name">Previous Close</p>
                        <p className="keyStats-value">{response.previousClose}</p>
                    </li> */}
                    {/* <li>
                        <p className="keyStats-name">Day Range</p>
                        <p className="keyStats-value">{response.dayRange}</p>
                    </li> */}
                    {/* <li>
                        <p className="keyStats-name">Volume</p>
                        <p className="keyStats-value">{response.previousVolume}</p>
                    </li> */}
                    {/* <li>
                        <p className="keyStats-name">Market Cap</p>
                        <p className="keyStats-value">{response.marketCap}</p>
                    </li> */}
                    {/* <li>
                        <p className="keyStats-name">P/E Ratio</p>
                        <p className="keyStats-value">{response.peRatio}</p>
                    </li> */}
                {/* </ul>
                <ul className="keyStats-li2"> */}
                    {/* <li>
                        <p className="keyStats-name">Open</p>
                        <p className="keyStats-value">{response.open}</p>
                    </li> */}
                    {/* <li>
                        <p className="keyStats-name">52 Week Range</p>
                        <p className="keyStats-value">{response.week52Range}</p>
                    </li> */}
                    {/* <li>
                        <p className="keyStats-name">Total Avg Volume</p>
                        <p className="keyStats-value">{response.avgTotalVolume}</p>
                    </li> */}
                    {/* <li>
                        <p className="keyStats-name">Earning Per Share</p>
                        <p className="keyStats-value">{response.earningsPerShare}</p>
                    </li> */}
                    {/* <li>
                        <p className="keyStats-name">Dividend & Yield</p>
                        <p className="keyStats-value">{response ? response.ytdChange + "%" : ""}</p>
                    </li>
                </ul> */}
            </div>
    )
}
export default KeyStats;