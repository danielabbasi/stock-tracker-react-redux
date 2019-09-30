import React from "react";
import Header from "./components/Header";
import KeyStats from "./components/keyStats";
import Chart from "./components/chart";
import LatestNews from './components/LatestNews';
import {useSelector} from 'react-redux';
import './App.css';

function App() {
  const state = useSelector((state) => state)
  return (
    <>
        <Header response={state.response}/>
        <KeyStats response={state.response}/>
        <Chart chartData={state.chartData} id="chartDiv"/>
        <LatestNews latestNews={state.latestNews} />
    </>
  );
}
export default App;