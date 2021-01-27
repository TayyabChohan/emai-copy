import React, { Component } from "react";
import { connect } from "react-redux";
import { GetHeaderName, GetMenu } from "./actions/customerAction";
import AlertMessage from "./AlertMessage";
import { toastr } from "react-redux-toastr";
import { get_template_list, hideLoading } from "./actions/templatesAction";
import "../mainStyleSheet/templateListPage.css";
const action = {
  GetHeaderName,
  get_template_list,
  GetMenu,
  hideLoading,
};
class TemplateListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      name: "",
      templateLink: "",
      query: "",
      myTemplate: [],
      templateList: [],
      title: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
    };
  };

  selectDiv = (selectedTemplate) => {
    this.setState({
      myTemplate: selectedTemplate,
    });
  };
  nextButton = () => {
   
    if (this.state.myTemplate.length < 1 && this.state.name === "") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.setState({
        message: " Enter compaign name.\n Choose a template below.",
      });
    } else if (this.state.name === "") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.setState({
        message: "* Compaign name can't be Empty!!",
      });
    } else if (this.state.myTemplate.length < 1) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.setState({
        message: "* Template is required. Please choose a template below.",
      });
    } else {
      this.props.history.push({
        pathname: `/${this.state.myTemplate.uri}/${this.state.myTemplate.id}/${
          this.state.myTemplate.code
        }/${encodeURIComponent(this.state.name)}/save`,
      });
    }
  };
  setLink = (link, title) => {
    this.setState({
      templateLink: link,
      title: title,
    });
  };
  async componentDidMount() {
    document.title = "Campaign - Email Copy";
    this.props.get_template_list();

    const data = {
      headerName: "Choose Template",
    };
    this.props.GetHeaderName(data);
    const data_home = {
      home: "home_creteCompaign",
    };
    this.props.GetMenu(data_home);
  }
  handleKeyDown = (e) => {
    if (e.currentTarget.value.includes("%")) {
      e.currentTarget.value = e.currentTarget.value.replace(/%/g, "");
      toastr.warning("Warning!", "You can't Enter %");
    } else if (e.currentTarget.value.includes(`\\`)) {
      e.currentTarget.value = e.currentTarget.value.replace(/\\/g, "");
      toastr.warning("Warning!", "You can't Enter \\");
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.template_list_array !== this.props.template_list_array &&
      this.props.template_list_array !== ""
    ) {
      const data = {
        loading: true,
      };
      this.props.hideLoading(data);
    }
  }

  render() {
    return (
      <div>
        <section className="container">
          <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content" style={{ width: "671px" }}>
                <div className="modal-header">
                  <h3>{this.state.title}</h3>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  {this.state.templateLink === null ? (
                    <img
                      className="watch_image1"
                      src={
                        window.location.origin +
                        "/asset/image/video-coming-soon.png"
                      }
                    />
                  ) : (
                    <div className="embadCode">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.state.templateLink,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <a id="totop" href="#" style={{ display: "inline" }}>
            <i class="fa fa-angle-up"></i>
          </a>
          <br />
          <br />
          <div class="messageOnClick">
            {" "}
            <div>
              {this.state.message.split("\n").map((item) => (
                <p>{item}</p>
              ))}
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <h5>
                      Campaign Name{" "}
                      <span className="required" style={{ color: "red" }}>
                        {" "}
                        *
                      </span>
                    </h5>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={this.state.name}
                      onKeyUp={this.handleKeyDown}
                      onChange={this.handleChange}
                      placeholder="Campaign Name"
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <h5>
                      Choose A Template{" "}
                      <span className="required" style={{ color: "red" }}>
                        {" "}
                        *
                      </span>
                    </h5>
                  </div>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="query"
                      value={this.state.query}
                      onChange={this.handleChange}
                      placeholder="Start typing to search Template below ..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />

            <div className="templates-heading">
              <b> Internal Promotions</b>
            </div>
            <div className="text-center margin-bottom-20">
              Campaigns for your own products, services, and offers ...
            </div>
            <div class="container">
              <div className="row">
                {this.props.template_list_array
                  .filter((filteredList) =>
                    filteredList.title
                      .toLowerCase()
                      .includes(this.state.query.toLowerCase())
                  )
                  .map((list, index) =>
                    list.type == null ? (
                      <div className="col-md-3 col-sm-6 col-xs-12 bootCols">
                        <div className="penal">
                          {list.is_new ? (
                            <div className="newItem">
                              <img
                                src="https://emailcopy.doneforyou.com/theme/images/new.png"
                                alt="no image"
                                style={{ width: "50px", height: "50px" }}
                              />
                            </div>
                          ) : null}

                          <div
                            className="panel_body"
                            onClick={() => this.selectDiv(list)}
                            style={{
                              background:
                                list.id === this.state.myTemplate.id
                                  ? "#2c8ef8"
                                  : "white",
                            }}
                          >
                            <h4 className="text-center">{list.title}</h4>
                          </div>
                          <div className="infolink">
                            <img
                              onClick={() =>
                                this.setLink(list.embed_code, list.title)
                              }
                              src="https://img.icons8.com/fluent/48/000000/info.png"
                              alt="No Image"
                              data-toggle="modal"
                              data-target="#myModal"
                              data-toggle="modal"
                              data-target="#myModal"
                              style={{ height: "18px", width: "18px" }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null
                  )}
              </div>
            </div>
            <br />
            <div className="templates-heading">
              <b> Affiliate Sequences</b>
            </div>
            <div className="text-center margin-bottom-20">
              Sequences pre-loaded with Clickbank affiliate offers.
            </div>
            <div class="container">
              <div className="row">
                {this.props.template_list_array
                  .filter((filteredList) =>
                    filteredList.title
                      .toLowerCase()
                      .includes(this.state.query.toLowerCase())
                  )
                  .map((list) =>
                    list.type == "AFFILIATE" ? (
                      <div className="col-md-3 col-sm-6 col-xs-12 bootCols">
                        <div className="penal">
                          {list.is_new ? (
                            <div className="newItem">
                              <img
                                src="https://emailcopy.doneforyou.com/theme/images/new.png"
                                alt="no image"
                                style={{ width: "50px", height: "50px" }}
                              />
                            </div>
                          ) : null}
                          <div
                            className="panel_body"
                            onClick={() => this.selectDiv(list)}
                            style={{
                              background:
                                list.id === this.state.myTemplate.id
                                  ? "#2c8ef8"
                                  : "white",
                            }}
                          >
                            <h4 className="text-center">{list.title}</h4>
                          </div>
                          <div className="infolink">
                            <img
                              onClick={() =>
                                this.setLink(list.embed_code, list.title)
                              }
                              src="https://img.icons8.com/fluent/48/000000/info.png"
                              alt="No Image"
                              data-toggle="modal"
                              data-target="#myModal"
                              data-toggle="modal"
                              data-target="#myModal"
                              style={{ height: "18px", width: "18px" }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null
                  )}
              </div>
            </div>

            <div className="container">
              <div className="row">
                <button
                  onClick={() => this.nextButton()}
                  className="btn btn-primary undefined"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  {" "}
                  Next
                </button>
              </div>
              <div className="totop" href="#">
                <i class="fa fa-angle-up" aria-hidden="true"></i>
              </div>
            </div>
            <br />
          </form>
          <AlertMessage />
        </section>
      </div>
    );
  }
}
const mapsToprops = (state) => {
  return {
    headerName_array: state.customerReducer.headerName_array,
    template_list_array: state.templatesReducer.template_list_array,
  };
};

export default connect(mapsToprops, action)(TemplateListPage);
