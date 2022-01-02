import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// custom imports - START
import "./boot/i18n";
import { BrowserRouter } from "react-router-dom";
import store from "ecommerce-module/stores";
import { Provider } from "react-redux";

// custom imports - END

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
