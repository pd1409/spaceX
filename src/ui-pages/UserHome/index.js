import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Content from "./components/Content";
import { mapDispatchToProps } from "../../ui-utils/commons";
import { connect } from "react-redux";

const styles = {
};

class UserHome extends Component {

  render() {
    return (
      <div>
          <Content />
      </div>
    );
  }
}

const mapStateToProps=({screenConfiguration={}})=>{
  const {preparedFinalObject={}}=screenConfiguration
  const {userInfo={}}=preparedFinalObject;
  return {userInfo}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserHome));
