import React, { Component } from "react";
import { hideLoading } from "./actions/campaignsAction";
import "../mainStyleSheet/serverErrorStyle.css";
import { connect } from "react-redux";
const action = {
  hideLoading,
};
class ServerError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enbale: false,
      embed_code: "",
    };
  }
  componentDidMount() {
    const data = {
      loading: true,
    };
    this.props.hideLoading(data);
  }

  render() {
    return (
      <div className="center">
        <div className="alert alert-danger" role="alert">
          Oops! our server seems currently down. Please try again later.
        </div>
      </div>
    );
  }
}

const mapsToprops = (state) => {
  return {};
};

export default connect(mapsToprops, action)(ServerError);
