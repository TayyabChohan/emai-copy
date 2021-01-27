import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
class Loader extends Component {
  state = {};

  render() {
    return (
      <div class="loader-container">
        {this.props.loadingArray.loading === true
          ? $.LoadingOverlay("hide")
          : $.LoadingOverlay("show")}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loadingArray: state.compaignsReducer.loadingArray,
});

export default connect(mapStateToProps)(Loader);
