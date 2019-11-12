import React, { FC } from "react";

type ErrorProps = {
  feature: string;
};

export const ErrorMessage: FC<ErrorProps> = ({ feature }) => {
  return (
    <div>
      <p className="error__message">Error: {feature} can not be displayed</p>
    </div>
  );
};
