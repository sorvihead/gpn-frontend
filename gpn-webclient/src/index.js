import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import App from "./App";

const isProduction = process.env.NODE_ENV === "production";

(async () => {
  const rootEl = document.getElementById("root");

  const defaultHeaders = {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  };

  const developmentHeaders = {
    "X-Forwarded-Proto": "http",
    "X-Forwarded-Host": "localhost",
    "X-Forwarded-Port": "3000",
  };

  if (isProduction) {
    axios.defaults.headers.common = defaultHeaders;
    axios.defaults.baseURL = `/`;
  } else {
    axios.defaults.headers.common = {
      ...developmentHeaders,
      ...defaultHeaders,
    };
    axios.defaults.baseURL = "/";
  }

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        window.location.reload();
      }
      return Promise.reject(error);
    }
  );
  ReactDOM.render(<App />, rootEl);
})();
