import React from "react";
import Header from "./features/header/component/Header";
import KeyStats from "./features/keyStats/component/keyStats";
import Chart from "./features/chart/component/chart";
import LatestNews from "./features/latestNews/component/LatestNews";
import Overview from "./features/overview/component/Overview";
import Footer from "./features/footer/component/Footer";
import "./assets/styles/App.css";
import { useSelector } from "react-redux";
import TopPeers from "./features/topPeers/component/TopPeers";

function App() {
  const symbol = useSelector(state => state.search.symbol);
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
            <TopPeers />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
export default App;
