"use client";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./store/AppContext";
import { HashRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale="en">
      <AppProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </AppProvider>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
