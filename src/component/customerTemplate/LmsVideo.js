import React, { Component } from "react";
import "../../mainStyleSheet/templateQuestions.css";
import { connect } from "react-redux";
import { saveLmsVideoForm, updateCompaign } from "../actions/lmsVideoAction";
import AlertMessage from "../AlertMessage.js";
import { GetHeaderName, GetMenu } from "../actions/customerAction";
import TemplateVideoComponent from "./TemplateVideoComponent";
import {
  getTemplatesQuestionData,
  hideLoading,
  get_template_list,
} from "../actions/templatesAction";
// import { updateCompaign } from "../actions/campaignsAction";
const action = {
  GetHeaderName,
  saveLmsVideoForm,
  get_template_list,
  getTemplatesQuestionData,
  updateCompaign,
  GetMenu,
  hideLoading,
};
class LmsVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      benefits: ["", "", ""],
      enbale: false,
      templateCode: "",
      template_id: "",
      compaignTitle: "",
      compaignID: "",
      YourName: "",
      lms_support_email: "",
      lms_video_length: "",
      lms_url: "",
      lms_title: "",
      lms_Topic: "",
      embed_code: "",
    };
  }
  componentWillMount() {
    if (this.props.match.params.saveOrUpdate === "save") {
      this.setState({
        templateCode: this.props.match.params.templateCode,
        template_id: this.props.match.params.template_id,
        compaignTitle: unescape(this.props.match.params.compaignTitle),
      });
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount() {
    document.title = "Questions - Email Copy";
    if (this.props.match.params.saveOrUpdate !== "save") {
      const templateData = {
        template_id: parseInt(this.props.match.params.template_id),
        campaign_id: parseInt(this.props.match.params.saveOrUpdate),
      };
      this.props.getTemplatesQuestionData(templateData);
      this.setState({
        templateCode: this.props.match.params.templateCode,
      });
    }
    const data = {
      headerName: unescape(this.props.match.params.compaignTitle),
    };
    this.props.GetHeaderName(data);
    this.props.get_template_list();
    if (this.props.match.params.saveOrUpdate === "save") {
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
    const data1 = {
      loading: true,
    };
    this.props.hideLoading(data1);
  }
  removeBenefits = (index) => {
    this.state.benefits.splice(index, 1);
    this.setState({
      benefits: this.state.benefits,
    });
  };
  addBenefits() {
    this.setState({
      benefits: [...this.state.benefits, ""],
    });
  }

  handlensubmit = (e) => {
    e.preventDefault();
    const data = {
      lms_support_email: this.state.lms_support_email,
      lms_video_length: this.state.lms_video_length,
      name: this.state.YourName,
      lms_topic: this.state.lms_Topic,
      lms_title: this.state.lms_title,
      benefits: this.state.benefits,
      lms_url: this.state.lms_url,
      templateCode: this.state.templateCode,
      template_id: this.state.template_id,
      tenant_id: localStorage.getItem("tenant_id"),
      compaignTitle: this.state.compaignTitle,
    };
    this.props.saveLmsVideoForm(data);
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.templates_questions_data !==
        this.props.templates_questions_data &&
      this.props.templates_questions_data !== ""
    ) {
      this.setState({
        lms_support_email: this.props.templates_questions_data.result
          .lms_support_email,
        lms_video_length: this.props.templates_questions_data.result
          .lms_video_length,
        YourName: this.props.templates_questions_data.result.name,
        lms_Topic: this.props.templates_questions_data.result.lms_topic,
        lms_title: this.props.templates_questions_data.result.lms_title,
        lms_url: this.props.templates_questions_data.result.lms_url,
        benefits: this.props.templates_questions_data.Benefits.map((x) =>
          Object.values(x).toString()
        ),
      });
      const data1 = {
        loading: true,
      };
      this.props.hideLoading(data1);
    }

    if (
      prevProps.lmsVideoArray !== this.props.lmsVideoArray &&
      this.props.lmsVideoArray !== ""
    ) {
      this.props.history.push({
        pathname: `/previewemail/${
          this.props.lmsVideoArray
        }/${encodeURIComponent(
          unescape(this.props.match.params.compaignTitle)
        )}`,
      });
    }
    if (
      prevProps.template_list_array !== this.props.template_list_array &&
      this.props.template_list_array !== ""
    ) {
      this.props.template_list_array.map((item) => {
        if (item.code === this.state.templateCode) {
          this.setState({
            embed_code: item.embed_code,
          });
        }
      });
    }
  }
  updateCompaignData = () => {
    const data = {
      lms_support_email: this.state.lms_support_email,
      lms_video_length: this.state.lms_video_length,
      name: this.state.YourName,
      lms_topic: this.state.lms_Topic,
      lms_title: this.state.lms_title,
      lms_url: this.state.lms_url,
      benefits: this.state.benefits,
      templateCode: this.state.templateCode,
      template_id: parseInt(this.props.match.params.template_id),
      campaign_id: parseInt(this.props.match.params.saveOrUpdate),
    };
    this.props.updateCompaign(data);
  };

  handleOnchange(e, index) {
    this.state.benefits[index] = e.target.value;
    this.setState({
      benefits: this.state.benefits,
    });
  }
  hnaldeShowVideo = () => {
    this.setState({
      enbale: true,
    });
  };
  onChangetime = (time) => {
    this.setState({ time });
  };
  render() {
    const {
      YourName,
      lms_support_email,
      lms_video_length,
      lms_url,
      lms_title,
      lms_Topic,
      embed_code,
    } = this.state;
    return (
      <section>
        <div className="container">
          {this.state.embed_code === "" ? (
            ""
          ) : (
            <TemplateVideoComponent embed_code={this.state.embed_code} />
          )}
          <form id="statusCheck" onSubmit={this.handlensubmit}>
            <div className="row pl-5 pr-5 pt-4">
              <label className="pl-3 pr-5">
                Your Name{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    type="text"
                    name="YourName"
                    value={YourName}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter Your Name"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row pl-5 pr-5">
              <label className="pl-3 pr-5">
                {" "}
                Lead Magnet Topic (Topic of the video being given away){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="lms_Topic"
                    value={lms_Topic}
                    onChange={this.handleChange}
                    placeholder="Enter Lead Magnet Topic"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row pl-5 pr-5">
              <label className="pl-3 pr-5">
                {" "}
                Lead Magnet Title (Title of the video being given away){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="lms_title"
                    value={lms_title}
                    onChange={this.handleChange}
                    placeholder="Enter Lead Magnet Title"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Lead Magnet URL (URL where people can download the video){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="lms_url"
                    value={lms_url}
                    onChange={this.handleChange}
                    placeholder="EnterLead Magnet URL"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Lead Magnet Video Length (How long is your Lead Magnet Video, in
                minutes?){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="lms_video_length"
                    value={lms_video_length}
                    onChange={this.handleChange}
                    placeholder="Enter Lead Magnet Video Length"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Support Email (Email address of your support team (or you!)){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="email"
                    name="lms_support_email"
                    value={lms_support_email}
                    onChange={this.handleChange}
                    placeholder="Enter Support Email"
                    required
                  ></input>
                </div>
              </div>
            </div>

            <label className="row pl-5 pr-5">
              {" "}
              &nbsp; &nbsp; Lead Magnet Benefit (What readers can expect to
              learn from watching the video){" "}
              <span className="required" style={{ color: "red" }}>
                *
              </span>{" "}
            </label>
            {this.state.benefits.map((item, index) => (
              <div className="row pl-5 pr-5">
                <div className="col-md-10 col-xs-10 col-sm-10 col-lg-10">
                  <div className="form-group has-feedback">
                    {/* <span>
                  <i className="fa fa-trash"></i>
                </span> */}
                    <span class="input-group-addon">
                      <i class="glyphicon glyphicon-user"></i>
                    </span>
                    <input
                      className="form-control benft_input"
                      type="text"
                      placeholder={"Enter Benefit " + (index + 1)}
                      name="benefits"
                      onChange={(e) => this.handleOnchange(e, index)}
                      value={item}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-2 col-xs-2 col-sm-2 col-lg-2">
                  <button
                    onClick={() => this.removeBenefits(index)}
                    className="btn btn-danger undefined"
                    type="button"
                  >
                    <span>
                      <i class="fa fa-trash"></i>
                    </span>
                  </button>
                </div>
              </div>
            ))}

            <div className="row pl-5 pr-5">
              <div className="col-md-12 col-xs-12 col-sm-12">
                <button
                  onClick={(e) => this.addBenefits(e)}
                  className="btn btn-primary undefined"
                  type="button"
                  style={{ width: "122px" }}
                >
                  {" "}
                  + Add Benefit
                </button>
              </div>
            </div>
            <br />
            <div className="row button_next pl-5 pr-5">
              <div className="col-md-12 col-xs-12 col-sm-12">
                {this.props.match.params.saveOrUpdate === "save" ? (
                  <button
                    className="btn btn-primary undefined"
                    type="submit"
                    style={{ width: "100%" }}
                  >
                    {" "}
                    Next
                  </button>
                ) : (
                  <button
                    onClick={() => this.updateCompaignData()}
                    className="btn btn-primary undefined"
                    type="button"
                    style={{ width: "100%" }}
                  >
                    {" "}
                    Update
                  </button>
                )}
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
    lmsVideoArray: state.lmsVideoReducer.lmsVideoArray,
    template_list_array: state.templatesReducer.template_list_array,
    update_response: state.lmsVideoReducer.update_response,
    templates_questions_data: state.templatesReducer.templates_questions_data,
  };
};

export default connect(mapsToprops, action)(LmsVideo);
