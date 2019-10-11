import React from "react";
import Header from "./components/Header";
import KeyStats from "./components/keyStats";
import Chart from "./components/chart";
import LatestNews from "./components/LatestNews";
import Overview from "./components/Overview";
import Footer from "./components/Footer";
import "./assets/styles/App.css";
import { useSelector } from "react-redux";

function App() {
  const symbol = useSelector(state => state.symbol);
  if (symbol === "") {
    return (
      <div className="wrapper_default">
        <Header />
        <span className="content"></span>
        <Footer />
      </div>
    );
  }
  return (
    <div className="wrapper">
      <Header />
      <Chart />
      <KeyStats />
      <LatestNews />
      <Overview />
      <Footer />
    </div>
  );
}
export default App;
