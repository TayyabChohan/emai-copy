import React, { Component } from "react";
import "../mainStyleSheet/dashBoardStyle.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import { GetHeaderName, GetMenu } from "./actions/customerAction";
import {
  getAllCompaigns,
  deleteCompaign,
  hideLoading,
  getOneCompaigns,
} from "../component/actions/campaignsAction.js";
import { downloadCustomEmails } from "./actions/previewEmailAction";
import swal from "sweetalert";

const action = {
  GetHeaderName,
  getAllCompaigns,
  deleteCompaign,
  downloadCustomEmails,
  GetMenu,
  hideLoading,
  getOneCompaigns,
};
class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "Email Autoresponders",
      compaignsArray: [],
    };
  }
  handleMenucampaign = (id) => {
    const data = {
      campaignId: id,
    };
    this.props.getOneCompaigns(data);
    const data_home1 = {

      home: "Edit_Campaign",
    };
    this.props.GetMenu(data_home1);
  };
  handleMenu_custmize = (id) => {
    const data = {
      campaignId: id,
    };
    this.props.getOneCompaigns(data);
    const data_home1 = {
      home: "Customize_Email",
    };
    this.props.GetMenu(data_home1);
  };

  handleEditQuestion = (id) => {
    const data = {
      campaignId: id,
    };
    this.props.getOneCompaigns(data);
    const data_home = {
      home: "edit_questions",
    };
    this.props.GetMenu(data_home);
  };

  componentDidMount() {
    document.title = "Home - Email Copy";
    localStorage.setItem("tenant_id", 150);
    const data = {
      headerName: this.state.name,
    };
    const data_home = {
      home: "home",
    };
    this.props.GetMenu(data_home);
    const compaignData = {
      tenant_id: localStorage.getItem("tenant_id"),
    };
    this.props.getAllCompaigns(compaignData);
    this.props.GetHeaderName(data);
  }
  hanldeClick = () => {
    this.props.history.push({
      pathname: "/templatelistPage",
      tenant_id: localStorage.getItem("tenant_id"),
    });
    const data_home = {
      home: "home_creteCompaign",
    };
    this.props.GetMenu(data_home);
  };
  deleteThisCompaign = (CompaignID, TemplateID, templateTitle, deleteURL) => {
    swal({
      title: "Do you want to proceed?",
      text:
        "Oh no! Deleting the campaign will delete its questions, txt file, and any other data.",
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        const data = {
          template_id: TemplateID,
          campaign_id: CompaignID,
          code: templateTitle,
          deleteURL: deleteURL,
        };
        this.props.deleteCompaign(data);
      }
    });
  };
  downloadEmails = (compaignID, tenantID, title) => {
    const data = {
      tenant_id: tenantID,
      campaign_id: compaignID,
      title: title,
    };
    this.props.downloadCustomEmails(data);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.compaign_array !== this.props.compaign_array &&
      this.props.compaign_array !== ""
    ) {
      const data = {
        loading: true,
      };
      this.props.hideLoading(data);
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row" style={{ marginTop: "15px" }}>
          <div className="col-md-2" style={{ paddingLeft: "61px" }}>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => this.hanldeClick()}
            >
              + Add New
            </button>
          </div>
          <div className="col-md-10"></div>
        </div>
        <div className="row p-5">
          {this.props.checkArray === false &&
          this.props.serverError === false ? (
            <div class="alert alert-success" role="alert">
              Currently, You have no Campaigns Created. Please Create a new one.
            </div>
          ) : (
            ""
          )}

          {this.props.compaign_array.map((item, index) => (
            <div className="col-md-4 col-sm-6 col-xs-12 d-flex pb-5">
              <div class="card" style={{ width: "18rem" }}>
                <div class="card-body" style={{ textAlign: "center" }}>
                  <h4 class="card-title">{item.title}</h4>
                  <h6 class="card-title">{item.template.title}</h6>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <div className="row">
                      &nbsp;&nbsp;&nbsp;{" "}
                      <Link
                        className="btn btn-primary"
                        title="Edit Campaign"
                        to={{
                          pathname: `/campaign/${item.id}`,
                        }}
                        onClick={() => this.handleMenucampaign(item.id)}
                      >
                        {" "}
                        <span>
                          <i class="fas fa-edit"></i>
                        </span>
                      </Link>{" "}
                      &nbsp;
                      <Link
                        className="btn btn-primary"
                        title="Edit Questions"
                        to={{
                          pathname: `/${item.template.uri}/${
                            item.template_id
                          }/${item.template.code}/${encodeURIComponent(
                            item.title
                          )}/${item.id}`,
                        }}
                        onClick={()=>this.handleEditQuestion(item.template_id)}
                      >
                        <span>
                          <i
                            class="fa fa-question-circle"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </Link>
                      &nbsp;
                      <Link
                        className="btn btn-primary"
                        title="Preview"
                        to={{
                          pathname: `/previewemail/${
                            item.id
                          }/${encodeURIComponent(item.title)}`,
                        }}
                        onClick={()=>this.handleReview(item.id)}
                      >
                        {" "}
                        <span>
                          <i class="fas fa-eye"></i>
                        </span>
                      </Link>{" "}
                      &nbsp;
                      <button
                        onClick={() =>
                          this.downloadEmails(
                            item.id,
                            item.tenant_id,
                            item.title
                          )
                        }
                        className="btn btn-primary"
                        title="Download"
                      >
                        {" "}
                        <span>
                          <i class="fa fa-download"></i>
                        </span>
                      </button>
                      &nbsp;
                      <button
                        onClick={() =>
                          this.deleteThisCompaign(
                            item.id,
                            item.template_id,
                            item.template.code,
                            item.template.uri
                          )
                        }
                        className="btn btn-primary"
                        title="Delete"
                      >
                        {" "}
                        <span>
                          <i class="fa fa-trash"></i>
                        </span>
                      </button>{" "}
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div className="row">
                      <Link
                        className="btn btn-primary"
                        style={{ width: "100%" }}
                        title="Customize Email"
                        to={{
                          pathname: `/customizeemail/${
                            item.id
                          }/${encodeURIComponent(item.title)}`,
                        }}
                        onClick={()=>this.handleMenu_custmize(item.id)}
                      >
                        {" "}
                        <span>Customize Emails</span>
                      </Link>{" "}
                      <a href="#" className="nav-link">
                        {" "}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapsToprops = (state) => {
  return {
    headerName_array: state.customerReducer.headerName_array,
    nemu_array: state.customerReducer.nemu_array,
    compaign_array: state.compaignsReducer.compaign_array,
    delete_response: state.compaignsReducer.delete_response,
    checkArray: state.compaignsReducer.checkArray,
    serverError: state.compaignsReducer.serverError,
    warningCheck: state.compaignsReducer.warningCheck,
    loadingArray: state.compaignsReducer.loadingArray,
  };
};

export default connect(mapsToprops, action)(Dashboard);
