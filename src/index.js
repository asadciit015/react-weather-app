import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./store/AppContext";

import { IntlProvider } from "react-intl";

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale="en">
      <AppProvider>
        <App />
      </AppProvider>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
