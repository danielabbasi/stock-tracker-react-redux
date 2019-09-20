import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:5000"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    console.log(this.data)
    socket.on("FromAPI", data => this.setState({ response: data }));
  }
  render() {
    const { response } = this.state;
    console.log(response);
    return (
        <div >
          <ul>{ Object.keys(response).map((key, index) => (<li key={index}>{response[key]}</li>)) }</ul>
        </div>
    );
  }
}
export default App;