import React from "react";
import "./loading.css";

export const Loading = () => {
  return (
    <div>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
