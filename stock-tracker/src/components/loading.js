import React from "react";
import "../assets/styles/loading.css";

const Loading = () => {
  return (
    <div>
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
