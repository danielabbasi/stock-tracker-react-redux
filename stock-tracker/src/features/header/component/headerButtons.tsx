import React, { FC } from "react";

export const HeaderButtons: FC = () => {
  return (
    <div className="header__btns">
      <button className="header__btns__btn header__btns__btn--active">
        QUOTES
      </button>
      <button className="header__btns__btn">MARKETS</button>
      <button className="header__btns__btn">WATCHLIST</button>
    </div>
  );
};
