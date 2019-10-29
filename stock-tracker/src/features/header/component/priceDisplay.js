import React from "react";
import { useSelector } from "react-redux";
import { Icon } from "antd";

const PriceDisplay = () => {

    const response = useSelector(state => state.keyStats.response);

    return (
        <div className="price_display">
        <p className="price_display__small_icon">{response ? "$" : ""}</p>
        <h4>{response ? response.latestPrice : ""}</h4>
        <h4
          className={
            response
              ? response.change < 0
                ? "price_display--decrease"
                : "price_display--increase"
              : "hidden"
          }
        >
          <Icon
            className="price_display__arrow_icon"
            type={response.change < 0 ? "arrow-down" : "arrow-up"}
          />
          {response.change ? Math.abs(response.change.toFixed(2)) : ""}{" "}
          <span className="separator">|</span>
        </h4>
        <h4
          className={
            response
              ? response.changePercent < 0
                ? "price_display--decrease"
                : "price_display--increase"
              : "hidden"
          }
        >
          {response.changePercent
            ? Math.abs(response.changePercent.toFixed(2))
            : ""}
        </h4>
        <p
          className={
            response.changePercent < 0
              ? "price_display__small_icon price_display--decrease"
              : "price_display__small_icon price_display--increase"
          }
        >
          {response ? "%" : ""}
        </p>
      </div>
    )
}

export default PriceDisplay