import React from "react";
import Header from "./components/Header";
import KeyStats from "./components/keyStats";
import Chart from "./components/chart";
import LatestNews from './components/LatestNews';
import Overview from './components/Overview';
import TopPeers from './components/TopPeers'
import Footer from './components/Footer'
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <Chart/>
      <KeyStats/>
      <LatestNews/>
      <Overview/>
      <TopPeers/>
      <Footer/>
    </div>
  );
}
export default App;