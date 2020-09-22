import React from "react";
import { withRouter } from "react-router-dom";
import Snackbar from "./ui-containers/SnackBar";
import MainRoutes from "./ui-routes/MainRoutes";
import "./App.css";

class App extends React.Component {

  render() {
    return (
      <div>
        <MainRoutes />
        <Snackbar />
      </div>
    );
  }
}

export default (withRouter(App));
