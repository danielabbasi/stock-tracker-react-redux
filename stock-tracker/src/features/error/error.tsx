import React from "react";

type ErrorProps = {
  feature: string;
};

const ErrorMessage = ({ feature }: ErrorProps) => {
  return (
    <div>
      <p className="error__message">Error: {feature} can not be displayed</p>
    </div>
  );
};

export default ErrorMessage;
