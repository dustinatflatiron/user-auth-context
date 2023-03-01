import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/auth";
import { PostProvider } from "./context/post";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <PostProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PostProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
