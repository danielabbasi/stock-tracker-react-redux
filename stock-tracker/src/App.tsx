import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Header } from "./features/header";
import { KeyStats } from "./features/keyStats";
import { Chart } from "./features/chart/component/chart";
import { LatestNews } from "./features/latestNews";
import { Overview } from "./features/overview";
import { Footer } from "./features/footer";
import "./assets/styles/App.css";
import { AppState } from "store/rootReducer";

export const App: FC = () => {
  const symbol = useSelector((state: AppState) => state.search.symbol);
  return (
    <>
      <div className="wrapper">
        <Header />
        {symbol !== "" && (
          <>
            <Chart />
            <KeyStats />
            <LatestNews />
            <Overview />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
