import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/navbar.css";
import "./styles/modals.css";
import "./styles/inputs-buttons.css";
import "./styles/job-list.css";
import "./styles/pay.css";
import "./styles/pay-ocr.css";
import App from "./App";
import { AppProvider } from "./context";

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,

  document.getElementById("root")
);
