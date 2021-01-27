import React, { Component } from "react";
import { connect } from "react-redux";
import { GetHeaderName,GetMenu } from "../actions/customerAction";
import {
  getTemplateType,
  updateCampaignTitle,
} from "../actions/campaignsAction";

import AlertMessage from "../AlertMessage";
import { hideLoading } from "../actions/templatesAction";

const action = {
  GetHeaderName,
  hideLoading,
  getTemplateType,
  updateCampaignTitle,
  GetMenu
};
class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateTitle: "",
      campaignTitle: "",
    };
  }
  componentWillMount() {
    document.title = "Edit Campaign - Email Copy";
    const data_home1 = {
      home: "Edit_Campaign",
    };
    this.props.GetMenu(data_home1);
  }
  handlensubmit = (e) => {
    e.preventDefault();
    const data = {
      campaignTitle: this.state.campaignTitle,
      compaignID: this.props.match.params.compaignID,
    };
    this.props.updateCampaignTitle(data);
  };
  componentDidUpdate = (prevProps, preState) => {
    if (
      prevProps.template_campaign_name !== this.props.template_campaign_name &&
      this.props.template_campaign_name !== ""
    ) {
      this.setState({
        templateTitle: this.props.template_campaign_name.value.templateTitle,
        campaignTitle: this.props.template_campaign_name.value.campaignTitle,
      });
      const data = {
        headerName: this.props.template_campaign_name.value.campaignTitle,
      };
      this.props.GetHeaderName(data);
    }
  };
  componentDidMount() {
    const data = {
      compaignID: this.props.match.params.compaignID,
    };
    this.props.getTemplateType(data);
    const data1 = {
      loading: true,
    };
    this.props.hideLoading(data1);
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <section>
        <div className="container">
          <form id="statusCheck" onSubmit={this.handlensubmit}>
            <div className="row pl-5 pr-5 pt-4">
              <label className="pl-3 pr-5">
                Template Type:{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    disabled="disabled"
                    type="text"
                    name="templateTitle"
                    value={this.state.templateTitle}
                    className="form-control"
                  ></input>
                </div>
              </div>
            </div>
            <div className="row pl-5 pr-5">
              <label className="pl-3 pr-5">
                {" "}
                Campaign Name{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="campaignTitle"
                    value={this.state.campaignTitle}
                    onChange={this.handleChange}
                    required
                  ></input>
                </div>
              </div>
            </div>
            <br />
            <div className="row button_next pl-5 pr-5">
              <div className="col-md-12 col-xs-12 col-sm-12">
                <button
                  className="btn btn-primary undefined"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  {" "}
                  Update
                </button>
              </div>
            </div>
          </form>
          <br />
          <br />
        </div>
        <AlertMessage />
      </section>
    );
  }
}
const mapsToprops = (state) => {
  return {
    headerName_array: state.customerReducer.headerName_array,
    template_campaign_name: state.customerReducer.template_campaign_name,
  };
};

export default connect(mapsToprops, action)(Campaign);
