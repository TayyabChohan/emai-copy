import React, { Component } from "react";
import "flatpickr/dist/themes/material_green.css";
import "../../mainStyleSheet/templateQuestions.css";
import { connect } from "react-redux";
import AlertMessage from "../AlertMessage.js";
import {
  saveLeadMagnetSequenceMultipleVideoForm,
  updateCompaign,
} from "../actions/leadMagnetSequenceMultipleVideoAction";
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
  saveLeadMagnetSequenceMultipleVideoForm,
  get_template_list,
  getTemplatesQuestionData,
  updateCompaign,
  GetMenu,
  hideLoading,
};
export class LeadMagnetSequenceMultipleVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lms_topic: "",
      lms_title: "",
      lms_url: "",
      lms_video_count: "",
      lms_delivery: "",
      lms_support_email: "",
      benefits: ["", "", ""],
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
      lms_topic: this.state.lms_topic,
      lms_title: this.state.lms_title,
      lms_url: this.state.lms_url,
      lms_video_count: this.state.lms_video_count,
      lms_delivery: this.state.lms_delivery,
      lms_support_email: this.state.lms_support_email,
      benefits: this.state.benefits,
      templateCode: this.state.templateCode,
      template_id: this.state.template_id,
      tenant_id: localStorage.getItem("tenant_id"),
      compaignTitle: this.state.compaignTitle,
    };
    this.props.saveLeadMagnetSequenceMultipleVideoForm(data);
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.templates_questions_data !==
        this.props.templates_questions_data &&
      this.props.templates_questions_data !== ""
    ) {
      this.setState({
        name: this.props.templates_questions_data.result.name,
        lms_topic: this.props.templates_questions_data.result.lms_topic,
        lms_title: this.props.templates_questions_data.result.lms_title,
        lms_url: this.props.templates_questions_data.result.lms_url,
        lms_video_count: this.props.templates_questions_data.result
          .lms_video_count,
        lms_delivery: this.props.templates_questions_data.result.lms_delivery,
        lms_support_email: this.props.templates_questions_data.result
          .lms_support_email,
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
        if (item.code == this.state.templateCode) {
          this.setState({
            embed_code: item.embed_code,
          });
        }
      });
    }
  }
  updateCompaignData = () => {
    const data = {
      name: this.state.name,
      lms_topic: this.state.lms_topic,
      lms_title: this.state.lms_title,
      lms_url: this.state.lms_url,
      lms_video_count: this.state.lms_video_count,
      lms_delivery: this.state.lms_delivery,
      lms_support_email: this.state.lms_support_email,
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
  render() {
    const { embed_code } = this.state;
    return (
      <section>
        <div className="container">
          {this.state.embed_code == "" ? (
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
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    className="form-control"
                    required
                    placeholder="Enter Your Name"
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
                    name="lms_topic"
                    value={this.state.lms_topic}
                    onChange={this.handleChange}
                    placeholder="Enter Lead Magnet Topic"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
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
                    value={this.state.lms_title}
                    onChange={this.handleChange}
                    required
                    placeholder="Enter Lead Magnet Title"
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
                    value={this.state.lms_url}
                    onChange={this.handleChange}
                    required
                    placeholder="Enter Lead Magnet URL"
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Lead Magnet Video Count (How many videos are in the series?){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="lms_video_count"
                    value={this.state.lms_video_count}
                    onChange={this.handleChange}
                    required
                    placeholder="Enter Lead Magnet Video Count"
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Lead Magnet Delivery (How will your videos be delivered? Daily?
                Weekly?){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="lms_delivery"
                    value={this.state.lms_delivery}
                    onChange={this.handleChange}
                    required
                    placeholder="Enter Lead Magnet Delivery"
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
                    value={this.state.lms_support_email}
                    onChange={this.handleChange}
                    required
                    placeholder="Enter Support Email"
                  ></input>
                </div>
              </div>
            </div>
            <label className="row pl-5 pr-5">
              {" "}
              &nbsp; &nbsp; Lead Magnet Sequence Multiple Video Benefits{" "}
              <span className="required" style={{ color: "red" }}>
                *
              </span>{" "}
            </label>
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
    templateFormArray:
      state.leadMagnetSequenceMultipleVideoReducer.templateFormArray,
    template_list_array: state.templatesReducer.template_list_array,
    update_response:
      state.leadMagnetSequenceMultipleVideoReducer.update_response,
    templates_questions_data: state.templatesReducer.templates_questions_data,
  };
};

export default connect(mapsToprops, action)(LeadMagnetSequenceMultipleVideo);
