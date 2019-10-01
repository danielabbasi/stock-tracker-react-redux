import React from "react";
import Header from "./components/Header";
import KeyStats from "./components/keyStats";
import Chart from "./components/chart";
import LatestNews from './components/LatestNews';
import Overview from './components/Overview';
import './App.css';

function App() {
  return (
    <>
        <Header/>
        <KeyStats/>
        <Chart id="chartDiv"/>
        <LatestNews/>
        <Overview/>
    </>
  );
}
export default App;