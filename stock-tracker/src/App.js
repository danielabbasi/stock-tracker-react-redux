import React, { useEffect, useCallback } from "react";
import Header from "./Header";
import KeyStats from "./keyStats";
import Chart from "./chart";
import LatestNews from "./LatestNews";
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, addResponseAction, addCompaniesAction, addChartDataAction, addLatestNewsAction } from './redux';
import './App.css';

const io = require('socket.io-client')
const socket = io('http://127.0.0.1:5000')

function App() {
  const symbol = useSelector((state) => state.symbol)
  const companies = useSelector((state) => state.companies)

  const dispatch = useDispatch()
  const addResponse = useCallback((response) => dispatch(addResponseAction(response)), [dispatch])
  const addCompanies = useCallback((companies) => dispatch(addCompaniesAction(companies)), [dispatch])
  const addChartData = useCallback((chartData) => dispatch(addChartDataAction(chartData)), [dispatch])
  const addNewsData = useCallback((latestNews) => dispatch(addLatestNewsAction(latestNews)), [dispatch])
  
  useEffect(() => {
    // if (companies === false) {
    //   socket.on("companies", companies => {
    //     addCompanies(companies)
    //     console.log(companies)
    //   })
    // }
    socket.emit("symbol", symbol)
    socket.on("FromAPI", (data, chart, news) => {
      addResponse(data)
      addChartData(chart)
      addNewsData(news)
    })
  }, [addResponse, symbol, addCompanies, companies, addChartData, addNewsData]);

  return (
    <>
      <Provider store={store}>
        <Header />
        <Chart id="chartDiv"/>
        <KeyStats/>
        <LatestNews/>
      </Provider>
    </>
  );
}
export default App;