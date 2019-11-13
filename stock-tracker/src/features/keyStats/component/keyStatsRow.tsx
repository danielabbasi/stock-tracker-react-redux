import React, { FC } from "react";
import "./KeyStats.css";

type KeyStatsRowProps = {
  label: string;
  value: string | number;
};

export const KeyStatsRow: FC<KeyStatsRowProps> = ({ label, value }) => {
  return (
    <tr>
      <td className="keystats__grid__display1__name">{label}</td>
      <td className="keystats__grid__display1__value">{value}</td>
    </tr>
  );
};
