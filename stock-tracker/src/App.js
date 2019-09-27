import React, { useEffect, useCallback } from "react";
import Header from "./Header";
import KeyStats from "./keyStats";
import Chart from "./chart";
import { useSelector, useDispatch } from 'react-redux';
import { addResponseAction, addCompaniesAction, addChartDataAction } from './redux';
import './App.css';
const io = require('socket.io-client')
const socket = io('http://127.0.0.1:5000')

function App() {
  const state = useSelector((state) => state)
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
    socket.emit("symbol", state.symbol, state.chartTime)
    socket.on("FromAPI", (data, chart) => {
      addResponse(data)
      addChartData(chart)
    })
  }, [addResponse, state.symbol, addCompanies, state.companies, addChartData, state.chartTime])

  useEffect(() => {
    socket.emit("chartTime", state.symbol, state.chartTime)
  }, [state.chartTime, state.symbol])

  return (
    <>
        <Header response={state.response}/>
        <KeyStats response={state.response}/>
        <Chart chartData={state.chartData} id="chartDiv"/>
    </>
  );
}
export default App;