import React, { useState, useEffect } from "react";
import SearchBar from "./form";

const io = require('socket.io-client')
const socket = io('http://127.0.0.1:5000')

function App() {
  const [response, setResponse] = useState(false);
  const [symbol, setSymbol] = useState("")

  const addSymbol = (symbol) => {
    setSymbol(symbol)
    socket.emit("symbol", symbol)
  }

  useEffect(() => {
    socket.on("FromAPI", data => {
      setResponse(data)
    })
    console.log(symbol);
    console.log(response)
  }, [symbol])
  return (
    <>
      <SearchBar addSymbol={addSymbol}/>
      <div>
        <ul>{Object.keys(response).map((key, index) => (<li key={index}>{key}: {response[key]}</li>))}</ul>
      </div>
    </>
  );
}
export default App;