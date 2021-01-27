import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../../mainStyleSheet/navStyle.css";
import { connect } from "react-redux";
import { GetHeaderName } from "../../actions/customerAction";
import {
  getAllCompaigns,
  getOneCompaigns,
} from "../../actions/campaignsAction";
const action = {
  GetHeaderName,
  getAllCompaigns,
  getOneCompaigns,
};
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      home: "",
      compaigns: "",
      tempValue_id: "",
      tempValue_campaign: "",
      tempValue_fileName: "",
      host: "",
      template_id: "",
      temp_Code: "",
      campaign_id: "",
      tempValue_id_edit: "",
      title_Email: "",
      uri: "",
      title: "",
      template: "",
    };
  }

  componentDidMount() {
    var tempValue = window.location.pathname.split("/");
    this.setState({
      tempValue_id: tempValue[2],
      tempValue_id_edit: tempValue[5],
      tempValue_campaign: tempValue[4],
      tempValue_fileName: tempValue[1],
      host: window.location.host,
    });
    const compaignData = {
      tenant_id: localStorage.getItem("tenant_id"),
    };
    this.props.getAllCompaigns(compaignData);

    // if (this.state.tempValue_id !== "") {
    //    tempValue = window.location.pathname.split("/");
    //    console.log(tempValue)
    //   // const data = {
    //   //   campaignId: tempValue[2],
    //   //   tenant_id: localStorage.getItem("tenant_id"),
    //   // };
    //   // console.log(data);
    //   // this.props.getOneCompaigns(data);
    // }
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.headerName_array !== this.props.headerName_array &&
      this.props.headerName_array !== ""
    ) {
      this.setState({
        name: this.props.headerName_array.headerName,
      });
    }
    if (
      prevProps.nemu_array !== this.props.nemu_array &&
      this.props.nemu_array !== ""
    ) {
      this.setState({
        home: this.props.nemu_array.home,
      });
    
    }
    if (
      prevProps.compaign_array !== this.props.compaign_array &&
      this.props.compaign_array !== ""
    ) {
      this.setState({
        compaigns: this.props.compaign_array,
      });
    }
  };
  handlEditQuestion = () => {
    this.state.compaigns.map((item) => {
      if (item.id == this.state.tempValue_id) {
        this.setState({
          temp_Code: item.template.code,
          uri: item.template.uri,
          title: item.title,
          template: item.template_id,
          template_id: item.id,
        });
      }
    });
  };
  preEmailHnadle = () => {
    this.state.compaigns.map((item) => {
      if (item.id == this.state.tempValue_id) {
        this.setState({
          title_Email: item.title,
        });
      }
    });
  };

  render() {
    console.log(this.props.oneCampaign.id);
    console.log(this.props.oneCampaign.template);
    console.log("menu", this.props.nemu_array);
    const { tempValue_id } = this.state;
    return (
      <section>
        <nav className="navbar  navbar-expand-lg navbar-light bg-white">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              {" "}
              <h4>{this.state.name}</h4>{" "}
            </li>
          </ul>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active"></li>
              <li className="nav-item"></li>
              <li className="nav-item"></li>
            </ul>
            <span className="navbar-text">
              {this.state.home === "home_creteCompaign" ? (
                <div>
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a className="nav-link active">
                        <i className="fa fa-home" />
                        &nbsp;
                        <Link
                          style={{ color: "white" }}
                          to={{
                            pathname: `/`,
                          }}
                        >
                          Home
                        </Link>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link">
                        <i className="fa fa-angle-right" />
                        &nbsp; &nbsp;
                        <Link
                          style={{ color: "gray" }}
                          to={{
                            pathname: `/`,
                          }}
                        >
                          Create Campaign
                        </Link>
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
              {this.state.home === "home_creteCompaign" ? (
                ""
              ) : (
                <div>
                  {this.state.home === "home" ? (
                    <ul className="nav nav-pills">
                      <li className="nav-item">
                        <a className="nav-link active">
                          <i class="fa fa-home"></i> &nbsp;
                          <Link
                            style={{ color: "white" }}
                            to={{
                              pathname: `/`,
                            }}
                          >
                            Home
                          </Link>
                        </a>
                      </li>
                    </ul>
                  ) : (
                    <div>
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <a className="nav-link">
                            <i class="fa fa-home"></i> &nbsp;
                            <Link
                              style={{ color: "blue" }}
                              to={{
                                pathname: `/`,
                              }}
                            >
                              Home
                            </Link>
                          </a>
                        </li>
                        {this.state.home == "Edit_Campaign" ? (
                          <li className="nav-item">
                            <a className="nav-link active">
                              <Link
                                style={{ color: "white" }}
                                to={{
                                  pathname: window.location.pathname,
                                }}
                              >
                                Campaign
                              </Link>
                            </a>
                          </li>
                        ) : (
                          <li className="nav-item">
                            <a className="nav-link">
                              <Link
                                style={{ color: "blue" }}
                                to={{
                                  pathname: `/campaign/${this.props.oneCampaign.id}`,
                                }}
                              >
                                Campaign
                              </Link>
                            </a>
                          </li>
                        )}

                        {this.state.home === "edit_questions" ? (
                          <li className="nav-item ">
                            <a className="nav-link active">
                              <Link
                                style={{ color: "white" }}
                                to={{
                                  pathname: window.location.pathname,
                                }}
                              >
                                Edit Questions
                              </Link>
                            </a>
                          </li>
                        ) : (
                          <li className="nav-item">
                            <a className="nav-link">
                              <Link
                                style={{ color: "blue" }}
                                to={{
                                  pathname: `/golf/${
                                    this.props.oneCampaign.id
                                  }/${"GOLF"}/${this.props.oneCampaign.title}/${
                                    this.props.oneCampaign.template_id
                                  }`,
                                }}
                                // onClick={this.handlEditQuestion}
                              >
                                Edit Questions
                              </Link>
                            </a>
                          </li>
                        )}
                        {this.state.home === "Customize_Email" ? (
                          <li className="nav-item">
                            <a className="nav-link active">
                              <Link
                                style={{ color: "white" }}
                                to={{
                                  pathname: window.location.pathname,
                                }}
                              >
                                Customize Emails
                              </Link>
                            </a>
                          </li>
                        ) : (
                          <li className="nav-item">
                            <a className="nav-link">
                              <Link
                                style={{ color: "blue" }}
                                to={{
                                  pathname: `/customizeemail/${this.props.oneCampaign.id}/${this.props.oneCampaign.title}`,
                                }}
                                onClick={this.preEmailHnadle}
                              >
                                Customize Emails
                              </Link>
                            </a>
                          </li>
                        )}

                        {this.state.home === "preview_Emails" ? (
                          <li className="nav-item">
                            <a className="nav-link active">
                              <Link
                                style={{ color: "white" }}
                                to={{
                                  pathname: window.location.pathname,
                                }}
                              >
                                Preview
                              </Link>
                            </a>
                          </li>
                        ) : (
                          <li className="nav-item">
                            <a className="nav-link">
                              <Link
                                style={{ color: "blue" }}
                                to={{
                                  pathname: `/previewemail/${this.props.oneCampaign.id}/${this.props.oneCampaign.title}`,
                                }}
                                onClick={this.preEmailHnadle}
                              >
                                Preview
                              </Link>
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </span>
          </div>
        </nav>
      </section>
    );
  }
}
const mapsToprops = (state) => {
  return {
    headerName_array: state.customerReducer.headerName_array,
    nemu_array: state.customerReducer.nemu_array,
    compaign_array: state.compaignsReducer.compaign_array,
    oneCampaign: state.compaignsReducer.oneCampaign,
  };
};

export default connect(mapsToprops, action)(NavBar);
