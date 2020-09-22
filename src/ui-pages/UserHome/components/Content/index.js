import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {withRouter} from "react-router-dom";
import Menu from "./components/Menu";
import UserRoutes from "../../../../ui-routes/UserHomeRoutes";


const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "black"
  },
  webHeader:{
    display:"flex",
    alignItems:"center",
    justifyContent:"left",
    flexGrow: 1,
  },
  content:{
    marginTop:90
  }
});

class MiniDrawer extends React.Component {
  state = {
    open: false
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes,history} = this.props;
    return (
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar>
            <div classes={{root:classes.webHeader}}>
              <div style={{display:"flex", alignItems:"center", cursor: "pointer"}} onClick = {() => history.push("/")}>
                <img src="/assets/logo.jpg" alt="spaceX" width = "200px"/>
              </div>
            </div>
            <Menu history={history}/>
          </Toolbar>
        </AppBar>
        <div className = {classes.content}>
          <UserRoutes />
        </div>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles, { withTheme: true })(MiniDrawer));
