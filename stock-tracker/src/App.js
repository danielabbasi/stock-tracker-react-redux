import React from "react";
import Header from "./components/Header";
import KeyStats from "./components/keyStats";
import Chart from "./components/chart";
import LatestNews from './components/LatestNews';
import Overview from './components/Overview';
import TopPeers from './components/TopPeers';
import Footer from './components/Footer';
import './App.css';
import { useSelector } from 'react-redux'

function App() {
  const symbol = useSelector((state) => state.symbol)
  if (symbol === '') {
    return (
      <div className="wrapper_default">
        <Header />
        <span className="content"></span>
        <Footer />
      </div>
    )
  }

  return (
    <div className="wrapper">
      <Header />
      <Chart />
      <KeyStats />
      <LatestNews />
      <Overview />
      <TopPeers />
      <Footer />
    </div>
  )
}
export default App;