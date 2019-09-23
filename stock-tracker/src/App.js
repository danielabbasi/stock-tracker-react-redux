import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:5000",
      symbol: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));

  }

  handleChange(event) {
    this.setState({ symbol: event.target.value });
  }

  handleSubmit(event) {
    // event.preventDefault();
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("symbol", this.state.symbol)
  }

  render() {
    const { response } = this.state;
    const properties = ["previousClose", "high", "low", "previousVolume", "marketCap", "open", "week52High", "week52Low", "avgTotalVolume"]

    return (
      <>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
          <input type="text" value={this.state.symbol} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>

        <div>
          <ul>{Object.keys(response).map((key, index) => (<li key={index}>{key}: {response[key]}</li>))}</ul>
        </div>
      </>

    );
  }
}
export default App;