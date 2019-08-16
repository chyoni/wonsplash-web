import React from "react";
import ReactDOM from "react-dom";
import App from "../src/Components/App";
import { Provider } from "react-redux";
import store, { history } from "./Redux/configureStore";
import { ConnectedRouter } from "connected-react-router";
import GlobalStyles from "./Styles/GlobalStyles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <GlobalStyles />
      <ToastContainer
        autoClose={2500}
        draggable={true}
        position={toast.POSITION.BOTTOM_CENTER}
        pauseOnHover={true}
      />
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
