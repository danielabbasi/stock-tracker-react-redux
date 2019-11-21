import React from "react";
import { initialStartupAction } from "./store/actions";
import ReactDOM from "react-dom";
import "./assets/styles/index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Rig } from "Test";

ReactDOM.render(<Rig />, document.getElementById("root"), () =>
  store.dispatch(initialStartupAction())
);

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root"),
//   () => store.dispatch(initialStartupAction())
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
