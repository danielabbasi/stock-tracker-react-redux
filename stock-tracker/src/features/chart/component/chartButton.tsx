import React, { FC } from "react";

type ChartButtonProps = {
  current: string;
  range: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
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
      onClick={onClick}
    >
      {range}
    </button>
  );
};
