import React, { useEffect, useCallback } from "react";
import SearchBar from "./SearchBar";
import KeyStats from "./keyStats";
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, addResponseAction, addCompaniesAction } from './redux';
import './App.css';

const io = require('socket.io-client')
const socket = io('http://127.0.0.1:5000')

function App() {
  const response = useSelector((state) => state.response)
  const symbol = useSelector((state) => state.symbol)
  const companies = useSelector((state) => state.companies)
  const dispatch = useDispatch()
  const addResponse = useCallback((response) => dispatch(addResponseAction(response)), [dispatch])
  const addCompanies = useCallback((companies) => dispatch(addCompaniesAction(companies)), [dispatch])
  
  useEffect(() => {
    if (companies === false) {
      socket.on("companies", companies => {
        addCompanies(companies)
        console.log(companies)
      })
    }
    socket.emit("symbol", symbol)
    socket.on("FromAPI", data => {
      addResponse(data)
    })
  }, [addResponse, symbol, addCompanies, companies])

  return (
    <>
      <Provider store={store}>
        <SearchBar />
        <KeyStats/>
      </Provider>
    </>
  );
}
export default App;