import React, { FC } from "react";
import { ChartTime } from "../redux/actions";

type ChartButtonProps<CT extends ChartTime> = {
  current: ChartTime;
  range: CT;
  onClick: (chartTime: CT) => void;
};

export const ChartButton: FC<ChartButtonProps<ChartTime>> = ({
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
