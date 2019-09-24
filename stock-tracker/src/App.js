import React, { useEffect, useCallback } from "react";
import SearchBar from "./SearchBar";
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, addResponseAction } from './redux';

const io = require('socket.io-client')
const socket = io('http://127.0.0.1:5000')

function App() {
  const response = useSelector((state) => state.response)
  const symbol = useSelector((state) => state.symbol)
  const dispatch = useDispatch()
  const addResponse = useCallback((response) => dispatch(addResponseAction(response)), [dispatch])

  useEffect(() => {
    socket.emit("symbol", symbol)
    socket.on("FromAPI", data => {
      addResponse(data)
    })
  }, [addResponse, symbol])

  return (
    <>
      <Provider store={store}>
        <SearchBar />
        <div>
          <ul>{Object.keys(response).map((key, index) => (<li key={index}>{key}: {response[key]}</li>))}</ul>
        </div>
      </Provider>
    </>
  );
}
export default App;