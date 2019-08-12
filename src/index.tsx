import React from "react";
import ReactDOM from "react-dom";
import App from "../src/Components/App";
import { Provider } from "react-redux";
import store, { history } from "./Redux/configureStore";
import { ConnectedRouter } from "connected-react-router";
import GlobalStyles from "./Styles/GlobalStyles";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <GlobalStyles />
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
