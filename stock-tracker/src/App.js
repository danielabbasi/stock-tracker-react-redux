import React from "react";
import Header from "./features/header/component/Header";
import KeyStats from "./features/keyStats/component/keyStats";
import Chart from "./features/chart/component/chart";
import LatestNews from "./features/latestNews/component/LatestNews";
import Overview from "./features/overview/component/Overview";
import Footer from "./features/footer/component/Footer";
import "./assets/styles/App.css";
import { useSelector } from "react-redux";

function App() {
  const symbol = useSelector(state => state.symbol);
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
}
export default App;
