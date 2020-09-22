import React, { Component } from "react";
import { withStyles, Button, Typography, Grid } from "@material-ui/core";

const styles = {
    root: {
        background: "black",
        height: "100vh",
        display: "flex",
        alignItems: "center"
    },
    typo: {
        fontSize: 45,
        color: "white"
    }
};

class Landing extends Component {

  render() {
      const {classes} = this.props;
    return (

      <Grid container align= "center" className = {classes.root}>
          <Grid item md = {12} align= "center">
              <Typography className = {classes.typo}>
                  Get Started
              </Typography>
         <Button variant = "contained" onClick = { () => this.props.history.push("/home")}>Start</Button>
          </Grid> 
      </Grid>
    );
  }
}

export default (withStyles(styles)(Landing));
