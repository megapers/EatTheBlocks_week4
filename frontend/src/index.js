import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { BlockchainContextProvider } from "./store/blockchain-context";

ReactDOM.render(
  <React.StrictMode>
    <BlockchainContextProvider>
      <App />
    </BlockchainContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
