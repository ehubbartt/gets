import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/navbar.css";
import "./styles/modals.css";
import "./styles/inputs-buttons.css";
import "./styles/job-list.css";
import App from "./App";
import { AppProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
