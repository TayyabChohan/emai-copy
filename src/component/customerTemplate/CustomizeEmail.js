import React, { Component } from "react";
import "../../mainStyleSheet/emailViewStyle.css";
import { connect } from "react-redux";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { updateEmail } from "../actions/customizeEmailAction";
import AlertMessage from "../AlertMessage";
import {
  selectEmailsfromCustomTables,
  hideLoading,
} from "../actions/previewEmailAction";
import { GetHeaderName, GetMenu } from "../actions/customerAction";

const action = {
  selectEmailsfromCustomTables,
  GetHeaderName,
  GetMenu,
  hideLoading,
  updateEmail,
};

class CustomizeEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      activeToggle: {},
      value: "",
      copied: false,
      copiedSubject: false,
      Description: "",
      emails_update: [],
      subject: "",
      subjectArray: [],
      body: "",
    };
  }
  componentDidUpdate = (prevProps, preState) => {
    if (
      prevProps.emailArray !== this.props.emailArray &&
      this.props.emailArray !== ""
    ) {
      this.props.emailArray.map((elem, index) => {
        this.state.subjectArray[index] = elem.subject;
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
  };

  componentDidMount() {
    document.title = "Preview - Email Copy";
    const data_home = {
      home: "Customize_Email",
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
  handleChangeEditor = (content) => {
    this.setState({
      body: content,
    });
  };

  handleChange = (e, i) => {
    this.state.subjectArray[i] = e.target.value;
    this.setState({
      subject: this.state.subjectArray[i],
    });
  };
  updateEmails = (emailID, emailSubject) => {
    const data = {
      subject: emailSubject,
      body: this.state.body,
      campaign_id: this.props.match.params.compaignID,
      id: emailID,
    };
    this.props.updateEmail(data);
  };
  render() {
    return (
      <section>
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
                {item.emails_default.send_note}
              </div>
              <div className="faq-answer myAns">
                <div>
                  <span>
                    {" "}
                    <div className="row">
                      &nbsp;&nbsp;&nbsp;
                      <h5>Subject:-</h5> &nbsp; &nbsp;
                      <input
                        className="form-control"
                        type="text"
                        name="subject"
                        value={this.state.subjectArray[i]}
                        onChange={(e) => this.handleChange(e, i)}
                      ></input>
                    </div>
                  </span>
                </div>
                <br />
                <div>
                  <span>
                    {" "}
                    <h5>Body:-</h5>
                    <SunEditor
                      className="sun-editor se-wrapper se-wrapper-code"
                      setOptions={{
                        buttonList: [
                          ["bold", "underline", "italic"],
                          ["link"],
                          ["codeView"],
                        ],
                      }}
                      enableToolbar={true}
                      name="body"
                      setContents={item.body}
                      onChange={this.handleChangeEditor}
                    />
                  </span>
                  <br />
                  <button
                    onClick={() =>
                      this.updateEmails(item.id, this.state.subjectArray[i])
                    }
                    className="btn btn-primary undefined"
                    type="button"
                    style={{ width: "100%" }}
                  >
                    {" "}
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <AlertMessage />
      </section>
    );
  }
}
const mapsToprops = (state) => {
  return {
    emailArray: state.emailViewReducer.emailArray,
    headerName_array: state.customerReducer.headerName_array,
  };
};

export default connect(mapsToprops, action)(CustomizeEmail);
