import React, { useState, useEffect } from "react";
import SearchBar from "./form";
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, addResponseAction } from './redux';

const io = require('socket.io-client')
const socket = io('http://127.0.0.1:5000')

function App() {
  
  const response = useSelector((state) => state.response)
  const symbol = useSelector((state) => state.symbol)

  const dispatch = useDispatch()
  const addResponse = (response) => dispatch(addResponseAction(response))
  // const [symbol, setSymbol] = useState("")

  // const addSymbol = (symbol) => {
  //   setSymbol(symbol)
  //   socket.emit("symbol", symbol)
  // }

  useEffect(() => {
    socket.on("FromAPI", data => {
      console.log("hello")
      addResponse({
        response: data
      })
    })
    console.log(response)
    console.log(symbol);
  }, [symbol])
  
  return (
    <>
      <Provider store={store}>
        <SearchBar/>
        <div>
          <ul>{Object.keys(response).map((key, index) => (<li key={index}>{key}: {response[key]}</li>))}</ul>
        </div>
      </Provider>
    </>
  );
}
export default App;