import React, { Component } from "react";
import "../../mainStyleSheet/emailViewStyle.css";
import { connect } from "react-redux";
import {
  selectEmailsfromCustomTables,
  downloadCustomEmails,
  hideLoading,
} from "../actions/previewEmailAction.js";
import { toastr } from "react-redux-toastr";
import AlertMessage from "../AlertMessage";
import { GetHeaderName, GetMenu } from "../actions/customerAction";
const action = {
  selectEmailsfromCustomTables,
  downloadCustomEmails,
  GetHeaderName,
  GetMenu,
  hideLoading,
};

class PreviewEmail extends Component {
  constructor(props) {
    super();
    this.state = {
      emails: [],
      clickbankProduct: [],
      activeToggle: {},
      value: "",
      copied: false,
      copiedSubject: false,
      Description: "",
    };
  }
  onEditorChange = (e) => {
    this.setState({
      emails: e.editor.getData(),
    });
  };
  downloadEmails = () => {
    const data = {
      tenant_id: localStorage.getItem("tenant_id"),
      campaign_id: this.props.match.params.compaignID,
      title: unescape(this.props.match.params.title),
    };
    this.props.downloadCustomEmails(data);
  };
  componentDidUpdate = (prevProps, preState) => {
    if (
      prevProps.emailArray !== this.props.emailArray &&
      this.props.emailArray !== ""
    ) {
      this.props.emailArray.map((elem) => {
        elem["open"] = false;
        if (this.state.activeToggle?.index) {
          elem["open"] = this.state.activeToggle?.bool;
        }
      });
      this.setState({
        emails: this.props.emailArray,
      });
      const data = {
        loading: true,
      };
      this.props.hideLoading(data);
    }
    if (
      prevProps.clickbankProductsArray !== this.props.clickbankProductsArray &&
      this.props.clickbankProductsArray !== ""
    ) {
      this.setState({
        clickbankProduct: this.props.clickbankProductsArray,
      });
    }
  };

  componentDidMount() {
    document.title = "Preview - Email Copy";
    if (this.props.match.params.updateOrSave === "save") {
      const data_home = {
        home: "home_creteCompaign",
      };
      this.props.GetMenu(data_home);
    } else {
      const data_home = {
        home: "edit_questions",
      };
      this.props.GetMenu(data_home);
    }
    const data_home = {
      home: "preview_Emails",
    };
    this.props.GetMenu(data_home);
    const data1 = {
      tenant_id: localStorage.getItem("tenant_id"),
      compaignID: this.props.match.params.compaignID,
    };
    this.props.selectEmailsfromCustomTables(data1);
    const data = {
      headerName: unescape(this.props.match.params.title),
    };
    this.props.GetHeaderName(data);
  }
  onChange({ target: { value } }) {
    this.setState({ value, copied: false });
  }

  handleOncopy = (type, text) => {
    let textArea;
    textArea = document.createElement("textArea");
    textArea.value = text || "";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    type === 1
      ? toastr.success("Body", "Html Copied")
      : type === 2
      ? toastr.success("Subject", "Copied")
      : type === 3
      ? toastr.success("Product Promotion", "Copied")
      : toastr.success("Your Affiliate Link", "Html Copied");
  };

  toggle(index) {
    let element = JSON.parse(JSON.stringify(this.state.emails[index]));
    let emails = JSON.parse(JSON.stringify(this.state.emails));
    emails.map((elem) => {
      elem["open"] = false;
    });
    element["open"] = !element["open"];
    emails[index] = element;
    this.setState({
      emails: [...emails],
      activeToggle: { index, bool: element["open"] },
    });
  }

  render() {
    return (
      <section>
        <div className="container-fluid">
          {this.state.clickbankProduct.length > 1 ? (
            <div>
              <br />
              <h5>Clickbank products in this sequence:</h5> <br />
              <br />
            </div>
          ) : null}{" "}
          {this.state.clickbankProduct.length > 1
            ? this.state.clickbankProduct.map((item, i) => (
                <div class="container d-flex h-100">
                  <div class="row justify-content-center align-self-center">
                    {item[0]}
                    {" (Your Affiliate Link - "}
                    <div
                      className="myDiv"
                      id="myDiv"
                      dangerouslySetInnerHTML={{
                        __html: item[1],
                      }}
                    ></div>
                  </div>
                </div>
              ))
            : null}
          <div className="row pl-5 pr-5 pt-3">
            &nbsp; &nbsp;
            <div className="col-md-11 col-sm-12 col-lg-11">
              <img
                alt="Download"
                className="download"
                src={window.location.origin + "/asset/image/download.png"}
                style={{ float: "right", cursor: "pointer" }}
                onClick={this.downloadEmails}
              />
            </div>
            {this.state.emails.map((item, i) => (
              <div className="col-md-12 col-lg-6 col-sm-12 col-xs-12 faqs">
                <div className={"faq " + (item.open ? "open" : "")}>
                  <div
                    className="faq-question"
                    key={i}
                    onClick={() => this.toggle(i)}
                  >
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    &nbsp;&nbsp;
                    <span className="label label-success">{i + 1}</span>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    {item.subject}
                  </div>
                  <div className="faq-answer myAns">
                    &nbsp;
                    <i className="fa fa-clock myClock" aria-hidden="true"></i>
                    &nbsp; {item.emails_default.send_note}
                    <br />
                    <br />
                    {item.emails_default.product_promotion &&
                    item.affiliate_link !== "" ? (
                      <div>
                        {/* **********Div for Product Promotion********** */}
                        <div>
                          <a
                            onClick={() => {
                              this.handleOncopy(
                                3,
                                item.emails_default.product_promotion
                              );
                            }}
                          >
                            <i
                              className="fa fa-clone myclipboard"
                              id="myclipboard"
                              title="Copy"
                              aria-hidden="true"
                            ></i>
                          </a>

                          <span>
                            {" "}
                            <div className="row">
                              <h5>Product Promotion:-</h5> &nbsp; &nbsp;{" "}
                              {item.emails_default.product_promotion}
                            </div>
                          </span>
                        </div>
                        {/* **********Div for Your Affiliate Link********** */}
                        <div>
                          <a
                            onClick={() => {
                              this.handleOncopy(4, item.affiliate_link);
                            }}
                          >
                            <i
                              className="fa fa-clone myclipboard"
                              id="myclipboard"
                              title="Copy"
                              aria-hidden="true"
                            ></i>
                          </a>

                          <span>
                            {" "}
                            <div className="row">
                              <h5>Your Affiliate Link:-</h5>&nbsp; &nbsp;{" "}
                              <div
                                className="myDiv"
                                id="myDiv"
                                dangerouslySetInnerHTML={{
                                  __html: item.affiliate_link,
                                }}
                              ></div>
                            </div>
                          </span>
                        </div>
                        <br />
                      </div>
                    ) : null}
                    <div>
                      <a
                        onClick={() => {
                          this.handleOncopy(2, item.subject);
                        }}
                      >
                        <i
                          className="fa fa-clone myclipboard"
                          id="myclipboard"
                          title="Copy"
                          aria-hidden="true"
                        ></i>
                      </a>

                      <span>
                        {" "}
                        <div className="row">
                          <h5>Subject:-</h5> &nbsp; &nbsp; {item.subject}
                        </div>
                      </span>
                    </div>
                    <br />
                    <div>
                      <a
                        onClick={() => {
                          this.handleOncopy(1, item.body);
                        }}
                      >
                        <i
                          className="fa fa-clone myclipboard"
                          id="myclipboard"
                          title="Copy"
                          aria-hidden="true"
                        ></i>
                      </a>

                      <span>
                        {" "}
                        <h5>Body:-</h5>
                        <div
                          className="myDiv"
                          id="myDiv"
                          dangerouslySetInnerHTML={{ __html: item.body }}
                        ></div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <AlertMessage />
        </div>
      </section>
    );
  }
}
const mapsToprops = (state) => {
  return {
    emailArray: state.emailViewReducer.emailArray,
    clickbankProductsArray: state.emailViewReducer.clickbankProductsArray,
    headerName_array: state.customerReducer.headerName_array,
  };
};

export default connect(mapsToprops, action)(PreviewEmail);
