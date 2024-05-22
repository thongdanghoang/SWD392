import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import "bootstrap";
import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
