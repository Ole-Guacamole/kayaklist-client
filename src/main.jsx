import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { ReviewProviderWrapper } from "./context/review.context"; //  <== ADD

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <ReviewProviderWrapper>
          <App />
        </ReviewProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);
