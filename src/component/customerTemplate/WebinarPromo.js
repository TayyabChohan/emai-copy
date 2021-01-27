import React, { Component } from "react";
import Flatpickr from "react-flatpickr";
import dateFormat from "dateformat";
import "../../mainStyleSheet/templateQuestions.css";
import TimePicker from "react-time-picker";
import { connect } from "react-redux";
import {
  savewebinarPromoForm,
  updateCompaign,
} from "../actions/webinarPromoAction";
import AlertMessage from "../AlertMessage";
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
  savewebinarPromoForm,
  get_template_list,
  getTemplatesQuestionData,
  updateCompaign,
  GetMenu,
  hideLoading,
};
class WebinarPromo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      host: "",
      name: "",
      topic: "",
      link: "",
      date: new Date(),
      // day: "",
      time: "00:00",
      selectedValue: "",
      benefits: ["", "", ""],
      enbale: false,
      templateCode: "",
      template_id: "",
      compaignTitle: "",
      compaignID: "",
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
      host: this.state.host,
      name: this.state.name,
      topic: this.state.topic,
      link: this.state.link,
      date: dateFormat(this.state.date, "yyyy-mm-dd"),
      day: dateFormat(this.state.date, "dddd"),
      time: this.state.time,
      benefits: this.state.benefits,
      templateCode: this.state.templateCode,
      template_id: this.state.template_id,
      tenant_id: localStorage.getItem("tenant_id"),
      compaignTitle: this.state.compaignTitle,
    };
    this.props.savewebinarPromoForm(data);
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.templates_questions_data !==
        this.props.templates_questions_data &&
      this.props.templates_questions_data !== ""
    ) {
      this.setState({
        host: this.props.templates_questions_data.result.host,
        name: this.props.templates_questions_data.result.name,
        topic: this.props.templates_questions_data.result.topic,
        link: this.props.templates_questions_data.result.link,
        date: this.props.templates_questions_data.result.date,
        day: this.props.templates_questions_data.result.day,
        time: this.props.templates_questions_data.result.time,
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
      prevProps.webinarPromoArray !== this.props.webinarPromoArray &&
      this.props.webinarPromoArray !== ""
    ) {
      this.props.history.push({
        pathname: `/previewemail/${
          this.props.webinarPromoArray
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
  hnaldeShowVideo = () => {
    this.setState({
      enbale: true,
    });
  };
  onChangetime = (time) => {
    this.setState({ time });
  };
  updateCompaignData = () => {
    const data = {
      host: this.state.host,
      name: this.state.name,
      topic: this.state.topic,
      link: this.state.link,
      date: dateFormat(this.state.date, "yyyy-mm-dd"),
      day: dateFormat(this.state.date, "dddd"),
      time: this.state.time,
      benefits: this.state.benefits,
      templateCode: this.state.templateCode,
      template_id: parseInt(this.props.match.params.template_id),
      campaign_id: parseInt(this.props.match.params.saveOrUpdate),
    };
    this.props.updateCompaign(data);
  };
  render() {
    const { embed_code } = this.state;
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
            <div className="row pl-5 pr-5">
              <label className="pl-3 pr-5">
                {" "}
                Webinar Signup Link{" "}
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
                    placeholder="Enter Webinar Signup Link"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row pl-5 pr-5">
              <label className="pl-3 pr-5">
                Webinar Date (when did it take place?){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <Flatpickr
                    className="form-control"
                    required
                    options={{
                      // mode: "range",
                      minDate: "today",
                      // enableTime: true,
                      dateFormat: "Y-m-d",
                      name: "name",
                      //defaultDate: ""
                      //wrap: true
                    }}
                    value={this.state.date}
                    onChange={(date) => {
                      this.setState({ date });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row pl-5 pr-5">
              <label className="pl-3 pr-5">
                Webinar Time{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <TimePicker
                    // amPmAriaLabel="aria-label"
                    className="react-time-picker__wrapper clock" //
                    value={this.state.time}
                    onChange={this.onChangetime}
                    required
                  />
                </div>
              </div>
            </div>
            <label className="row pl-5 pr-5">
              {" "}
              &nbsp; &nbsp;Webinar Promo Benefits{" "}
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
    webinarPromoArray: state.webinarPromoReducer.webinarPromoArray,
    template_list_array: state.templatesReducer.template_list_array,
    update_response: state.webinarPromoReducer.update_response,
    templates_questions_data: state.templatesReducer.templates_questions_data,
  };
};

export default connect(mapsToprops, action)(WebinarPromo);
