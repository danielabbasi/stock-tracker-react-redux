import React from "react";

type ChartButton = {
  current: string;
  range: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const ChartButton = ({ current, range, onClick }: ChartButton) => {
  return (
    <button
      className={
        current === range
          ? "chart__graph_btn--active"
          : "chart__graph_btn--inactive"
      }
      value={range}
      onClick={onClick}
    >
      {range}
    </button>
  );
};
