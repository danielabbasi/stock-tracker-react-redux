import React, { useState, FC } from "react";
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
import { Loading } from "../../loading/component/loading";
import { ErrorMessage } from "../../error/error";
import { ChartButton } from "./chartButton";
import "./chart.css";
import moment from "moment";
import { AppState } from "store/rootReducer";
import { ChartTime } from "../redux/actions";

const chartRanges: ChartTime[] = ["1D", "5D", "1M", "1Y", "5Y", "MAX"];

const formatDateXAxis = (tickItem: string, current: ChartTime) => {
  switch (current) {
    case "1D":
      return tickItem;
    case "5D":
      return moment(tickItem).format("dddd");
    case "1M":
    case "1Y":
      return moment(tickItem).format("MMM Do");
    case "5Y":
    case "MAX":
      return moment(tickItem).format("MMM, YYYY");
    default:
      return tickItem;
  }
};

export const Chart: FC = () => {
  const dispatch = useDispatch();
  const { chartData, loading, error } = useSelector(
    (state: AppState) => state.chart
  );
  const [current, setCurrent] = useState<ChartTime>("1Y");

  const latestValue =
    Array.isArray(chartData) && chartData[chartData.length - 1] !== undefined
      ? chartData[chartData.length - 1].close
      : "";

  const chartTimeClick = (chartTime: ChartTime) => {
    setCurrent(chartTime);
    dispatch(setChartTimeAction(chartTime));
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
            {chartRanges.map(range => (
              <ChartButton
                current={current}
                range={range}
                onClick={chartTimeClick}
              />
            ))}
          </div>
          <ResponsiveContainer className="responsive_chart">
            <AreaChart
              data={Array.isArray(chartData) ? chartData : undefined}
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
                tickFormatter={tickItem => formatDateXAxis(tickItem, current)}
                dataKey="date"
                tick={{ fill: "#ffffff" }}
              />
              <YAxis
                tick={{ fill: "#ffffff" }}
                tickFormatter={tick => tick.toFixed(2)}
                orientation="right"
              />
              <ReferenceLine
                y={latestValue}
                isFront={true}
                label={
                  <Label
                    value={latestValue}
                    className="chart__label"
                    position="right"
                  />
                }
                stroke="var(--bad)"
                strokeDasharray="3 3"
              />
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
