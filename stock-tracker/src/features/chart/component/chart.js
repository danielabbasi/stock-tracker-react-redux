import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { setChartTimeAction } from "../index";
import Loading from "../../loading/component/loading";
import ErrorMessage from "../../error/error";
import "./chart.css";
const moment = require("moment");

export const Chart = () => {
  const dispatch = useDispatch();
  const chartData = useSelector(state => state.chart.chartData);
  const loading = useSelector(state => state.chart.loading);
  const [current, setCurrent] = useState("1Y");
  const onClick = e => {
    dispatch(setChartTimeAction(e.target.value));
    setCurrent(e.target.value);
  };
  const latestValue =
    chartData[chartData.length - 1] !== undefined
      ? chartData[chartData.length - 1].close
      : "";
  const error = useSelector(state => state.chart.error);
  const formatDate = tickItem => {
    switch (current) {
      case "1D":
        return tickItem;
      case "5D":
        return moment(tickItem).format("dddd");
      case "1M":
        return moment(tickItem).format("MMM Do");
      case "1Y":
        return moment(tickItem).format("MMM Do");
      case "5Y":
        return moment(tickItem).format("MMM, YYYY");
      case "MAX":
        return moment(tickItem).format("MMM DD, YYYY");
      default:
        return tickItem;
    }
  };
  return (
    <div className="chart">
      {error ? (
        <ErrorMessage feature={"Chart data"} />
      ) : loading ? (
        <Loading />
      ) : (
        <>
          <div className="chart__graph_btn">
            <button
              className={
                current === "1D"
                  ? "chart__graph_btn--active"
                  : "chart__graph_btn--inactive"
              }
              value="1D"
              onClick={onClick}
            >
              1D
            </button>
            <button
              className={
                current === "5D"
                  ? "chart__graph_btn--active"
                  : "chart__graph_btn--inactive"
              }
              value="5D"
              onClick={onClick}
            >
              5D
            </button>
            <button
              className={
                current === "1M"
                  ? "chart__graph_btn--active"
                  : "chart__graph_btn--inactive"
              }
              value="1M"
              onClick={onClick}
            >
              1M
            </button>
            <button
              className={
                current === "1Y"
                  ? "chart__graph_btn--active"
                  : "chart__graph_btn--inactive"
              }
              value="1Y"
              onClick={onClick}
            >
              1Y
            </button>
            <button
              className={
                current === "5Y"
                  ? "chart__graph_btn--active"
                  : "chart__graph_btn--inactive"
              }
              value="5Y"
              onClick={onClick}
            >
              5Y
            </button>
            <button
              className={
                current === "MAX"
                  ? "chart__graph_btn--active"
                  : "chart__graph_btn--inactive"
              }
              value="MAX"
              onClick={onClick}
            >
              MAX
            </button>
          </div>
          <ResponsiveContainer className="responsive_chart">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid stroke="#f5f5f5" opacity="0.25" />
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#73b3ef" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#73b3ef" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                interval="preserveStart"
                tickFormatter={formatDate}
                dataKey="date"
                className="chart_axis"
                tick={{ fill: "#ffffff" }}
                // stroke="white"
              />
              <YAxis
                tick={{ fill: "#ffffff" }}
                tickFormatter={tick => tick.toFixed(2)}
                orientation="right"
              />
              <ReferenceLine
                y={latestValue}
                isFront={true}
                label={{
                  position: "right",
                  value: latestValue,
                  fill: "var(--bad)",
                  fontSize: 14
                }}
                stroke="var(--bad)"
                strokeDasharray="3 3"
              />
              <Label value={latestValue} stroke="black" position="right" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="close"
                stroke="#73b3ef"
                fillOpacity={1}
                fill="url(#colorUv)"
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};
