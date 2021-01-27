import React, { Component } from "react";
import "../../mainStyleSheet/templateQuestions.css";
import { connect } from "react-redux";
import AlertMessage from "../AlertMessage.js";
import TemplateVideoComponent from "./TemplateVideoComponent";
import {
  savewebinarReplayForm,
  updateCompaign,
} from "../actions/evergreenWebinarReplayAction";
import { GetHeaderName, GetMenu } from "../actions/customerAction";
import {
  getTemplatesQuestionData,
  hideLoading,
  get_template_list,
} from "../actions/templatesAction";
// import { updateCompaign } from "../actions/campaignsAction";
const action = {
  GetHeaderName,
  savewebinarReplayForm,
  get_template_list,
  getTemplatesQuestionData,
  updateCompaign,
  GetMenu,
  hideLoading,
};
export class EvergreenWebinarReplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      host: "",
      topic: "",
      link: "",
      day: "",
      call_to_action: "",
      call_to_action_link: "",
      benefits: ["", "", ""],
      dynamicBenefits: ["", "", ""],
      enbale: false,
      templateCode: "",
      template_id: "",
      compaignTitle: "",
      embed_code: "",
    };
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
  removeDynamicBenefits = (index) => {
    this.state.dynamicBenefits.splice(index, 1);
    this.setState({
      dynamicBenefits: this.state.dynamicBenefits,
    });
  };
  addDynamicBenefits() {
    this.setState({
      dynamicBenefits: [...this.state.dynamicBenefits, ""],
    });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  hnaldeShowVideo = () => {
    this.setState({
      enbale: true,
    });
  };
  componentWillMount() {
    if (this.props.match.params.saveOrUpdate === "save") {
      this.setState({
        templateCode: this.props.match.params.templateCode,
        template_id: this.props.match.params.template_id,
        compaignTitle: unescape(this.props.match.params.compaignTitle),
      });
    }
  }
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
  handlensubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      host: this.state.host,
      topic: this.state.topic,
      link: this.state.link,
      day: this.state.day,
      call_to_action: this.state.call_to_action,
      call_to_action_link: this.state.call_to_action_link,
      dynamicBenefits: this.state.dynamicBenefits,
      benefits: this.state.benefits,
      templateCode: this.state.templateCode,
      template_id: this.state.template_id,
      tenant_id: localStorage.getItem("tenant_id"),
      compaignTitle: this.state.compaignTitle,
    };
    this.props.savewebinarReplayForm(data);
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.templates_questions_data !==
        this.props.templates_questions_data &&
      this.props.templates_questions_data !== ""
    ) {
      this.setState({
        name: this.props.templates_questions_data.result.name,
        host: this.props.templates_questions_data.result.host,
        topic: this.props.templates_questions_data.result.topic,
        link: this.props.templates_questions_data.result.link,
        day: this.props.templates_questions_data.result.day,
        call_to_action: this.props.templates_questions_data.result
          .call_to_action,
        call_to_action_link: this.props.templates_questions_data.result
          .call_to_action_link,
        benefits: this.props.templates_questions_data.Benefits.map((x) =>
          Object.values(x).toString()
        ),
        dynamicBenefits: this.props.templates_questions_data.DynamicBenefits.map(
          (x) => Object.values(x).toString()
        ),
      });
      const data1 = {
        loading: true,
      };
      this.props.hideLoading(data1);
    }

    if (
      prevProps.templateFormArray !== this.props.templateFormArray &&
      this.props.templateFormArray !== ""
    ) {
      this.props.history.push({
        pathname: `/previewemail/${
          this.props.templateFormArray
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
  handleOnchange(e, index) {
    this.state.benefits[index] = e.target.value;
    this.setState({
      benefits: this.state.benefits,
    });
  }
  handleOnchangeDB(e, index) {
    this.state.dynamicBenefits[index] = e.target.value;
    this.setState({
      dynamicBenefits: this.state.dynamicBenefits,
    });
  }
  updateCompaignData = () => {
    const data = {
      name: this.state.name,
      host: this.state.host,
      topic: this.state.topic,
      link: this.state.link,
      day: this.state.day,
      call_to_action: this.state.call_to_action,
      call_to_action_link: this.state.call_to_action_link,
      dynamicBenefits: this.state.dynamicBenefits,
      benefits: this.state.benefits,
      templateCode: this.state.templateCode,
      template_id: parseInt(this.props.match.params.template_id),
      campaign_id: parseInt(this.props.match.params.saveOrUpdate),
    };
    this.props.updateCompaign(data);
  };
  render() {
    return (
      <section>
        <div className="container">
          {this.state.embed_code === "" ? (
            ""
          ) : (
            <TemplateVideoComponent embed_code={this.state.embed_code} />
          )}

          <div className="row pl-5 pr-5 pt-4">
            {this.state.enbale === false ? (
              ""
            ) : (
              <div className="col-md-12 col-sm-12 col-lg-12">
                <img
                  className="watch_image"
                  onClick={this.hnaldeShowVideo}
                  src={
                    window.location.origin + "/asset/image/help-vdo-icon.png"
                  }
                />
              </div>
            )}
          </div>
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
                    name="host"
                    value={this.state.host}
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
                Webinar Name{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Enter Webinar Name"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Webinar Topic{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="topic"
                    value={this.state.topic}
                    onChange={this.handleChange}
                    placeholder="Enter Webinar Topic"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Webinar Link (link to the replay of the webinar){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="link"
                    value={this.state.link}
                    onChange={this.handleChange}
                    placeholder="Enter Webinar Link"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Webinar Day (The day of the webinar -
                Monday/Tuesday/Wednesday/etc.){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="day"
                    value={this.state.day}
                    onChange={this.handleChange}
                    placeholder="Enter Webinar Day"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Call To Action (What did you ask registrants to do at the end of
                the webinar - Join a membership, enroll in a course, etc.){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="call_to_action"
                    value={this.state.call_to_action}
                    onChange={this.handleChange}
                    placeholder="Like - Join a membership, enroll in a course, etc"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Call To Action Link{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="call_to_action_link"
                    value={this.state.call_to_action_link}
                    onChange={this.handleChange}
                    placeholder="Enter Call To Action Link"
                    required
                  ></input>
                </div>
              </div>
            </div>
            {/* *************** Benefits ************************ */}
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Evergreen Webinar Replay Benefits{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
            </div>
            {this.state.benefits.map((item, index) => (
              <div className="row pl-5 pr-5">
                <div className="col-md-10 col-xs-10 col-sm-10 col-lg-10">
                  <div className="form-group has-feedback">
                    <span class="input-group-addon">
                      <i class="glyphicon glyphicon-user"></i>
                    </span>
                    <input
                      className="form-control benft_input"
                      type="text"
                      placeholder={"Enter benefit " + (index + 1)}
                      name="benefits"
                      onChange={(e) => this.handleOnchange(e, index)}
                      required
                      value={item}
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

            {/* *************** Dynamic Benefits ************************ */}
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Program Benefits (Benefits of the course, offer or program
                you're selling){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
            </div>
            {this.state.dynamicBenefits.map((dynamicBenefits, index) => (
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
                      placeholder={"Enter program benefit " + (index + 1)}
                      name="dynamicBenefits"
                      onChange={(e) => this.handleOnchangeDB(e, index)}
                      value={dynamicBenefits}
                    />
                  </div>
                </div>
                <div className="col-md-2 col-xs-2 col-sm-2 col-lg-2">
                  <button
                    onClick={() => this.removeDynamicBenefits(index)}
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
                  onClick={(e) => this.addDynamicBenefits(e)}
                  className="btn btn-primary undefined"
                  type="button"
                  style={{ width: "180px" }}
                >
                  {" "}
                  + Add Program Benefit
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
    templateFormArray: state.EvergreenWebinarReplayReducer.templateFormArray,
    template_list_array: state.templatesReducer.template_list_array,
    update_response: state.EvergreenWebinarReplayReducer.update_response,
    templates_questions_data: state.templatesReducer.templates_questions_data,
  };
};

export default connect(mapsToprops, action)(EvergreenWebinarReplay);
