import React, { useEffect, useCallback } from "react";
import Header from "./Header";
import KeyStats from "./keyStats";
import Chart from "./chart";
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, addResponseAction, addCompaniesAction, addChartDataAction } from './redux';
import './App.css';

const io = require('socket.io-client')
const socket = io('http://127.0.0.1:5000')

function App() {
  const symbol = useSelector((state) => state.symbol)
  const companies = useSelector((state) => state.companies)
  const chartTime = useSelector((state) => state.chartTime)


  const dispatch = useDispatch()
  const addResponse = useCallback((response) => dispatch(addResponseAction(response)), [dispatch])
  const addCompanies = useCallback((companies) => dispatch(addCompaniesAction(companies)), [dispatch])
  const addChartData = useCallback((chartData) => dispatch(addChartDataAction(chartData)), [dispatch])

  
  useEffect(() => {
    // if (companies === false) {
    //   socket.on("companies", companies => {
    //     addCompanies(companies)
    //     console.log(companies)
    //   })
    // }
    socket.emit("symbol", symbol)
    socket.on("FromAPI", (data, chart) => {
      addResponse(data)
      addChartData(chart)
    })
  }, [addResponse, symbol, addCompanies, companies, addChartData])

  useEffect(() => {
    socket.emit("chartTime", chartTime)
  }, [chartTime])

  return (
    <>
      <Provider store={store}>
        <Header />
        <KeyStats/>
        <Chart id="chartDiv"/>
      </Provider>
    </>
  );
}
export default App;