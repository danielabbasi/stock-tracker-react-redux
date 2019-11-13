import React, { FC } from "react";
import "./KeyStats.css";

type KeyStatsRowProps = {
  label: string;
  value: string | number;
};

export const KeyStatsRow: FC<KeyStatsRowProps> = ({ label, value }) => {
  return (
    <tr>
      <td className="keystats__display__table__name">{label}</td>
      <td className="keystats__display__table__value">{value}</td>
    </tr>
  );
};
