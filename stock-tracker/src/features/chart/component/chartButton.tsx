import React, { FC } from "react";
import { ChartTimes } from "../redux/actions";

type ChartButtonProps = {
  current: string;
  range: ChartTimes;
  onClick: <K extends ChartTimes>(chartTime: K) => void;
};

export const ChartButton: FC<ChartButtonProps> = ({
  current,
  range,
  onClick
}) => {
  return (
    <button
      className={
        current === range
          ? "chart__graph_btn--active"
          : "chart__graph_btn--inactive"
      }
      value={range}
      onClick={() => onClick(range)}
    >
      {range}
    </button>
  );
};
