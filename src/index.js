import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import themeObject from "./ui-config/theme";
import App from "./App";
import { Provider } from "react-redux";
import createStore from "./ui-redux/store";
import { HashRouter } from "react-router-dom";
import "./index.css";

//theme configuration
const theme = createMuiTheme(themeObject);

const rootElement = document.getElementById("root");

const { store } = createStore();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
    </Provider>
  </MuiThemeProvider>,
  rootElement
);
