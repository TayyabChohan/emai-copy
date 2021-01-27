import React, { Component } from "react";
import "flatpickr/dist/themes/material_green.css";
import "../../mainStyleSheet/templateQuestions.css";
import { connect } from "react-redux";
import AlertMessage from "../AlertMessage.js";
import { GetHeaderName, GetMenu } from "../actions/customerAction";
import {
  saveDirectRevenueForm,
  updateCompaign,
} from "../actions/directRevenueAction";
import TemplateVideoComponent from "./TemplateVideoComponent";
import {
  getTemplatesQuestionData,
  hideLoading,
  get_template_list,
} from "../actions/templatesAction";
// import { updateCompaign } from "../actions/campaignsAction";
const action = {
  GetHeaderName,
  saveDirectRevenueForm,
  get_template_list,
  getTemplatesQuestionData,
  updateCompaign,
  GetMenu,
  hideLoading,
};
export class DirectRevenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      link: "",
      benefits: ["", "", ""],
      questions: ["", "", ""],
      enbale: false,
      general_topic: "",
      ideal_client: "",
      investment: "",
      templateCode: "",
      template_id: "",
      compaignTitle: "",
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
  handleOnsubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      benefits: this.state.benefits,
      questions: this.state.questions,
      general_topic: this.state.general_topic,
      ideal_client: this.state.ideal_client,
      investment: this.state.investment,
      templateCode: this.state.templateCode,
      compaignTitle: this.state.compaignTitle,
      template_id: this.state.template_id,
      tenant_id: localStorage.getItem("tenant_id"),
    };
    this.props.saveDirectRevenueForm(data);
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.templates_questions_data !==
        this.props.templates_questions_data &&
      this.props.templates_questions_data !== ""
    ) {
      this.setState({
        name: this.props.templates_questions_data.result.name,
        email: this.props.templates_questions_data.result.email,
        general_topic: this.props.templates_questions_data.result.general_topic,
        ideal_client: this.props.templates_questions_data.result.ideal_client,
        investment: this.props.templates_questions_data.result.investment,
        benefits: this.props.templates_questions_data.Benefits.map((x) =>
          Object.values(x).toString()
        ),
        questions: this.props.templates_questions_data.Question.map((x) =>
          Object.values(x).toString()
        ),
      });
      const data1 = {
        loading: true,
      };
      this.props.hideLoading(data1);
    }

    if (
      prevProps.directRevenueArray !== this.props.directRevenueArray &&
      this.props.directRevenueArray !== ""
    ) {
      this.props.history.push({
        pathname: `/previewemail/${
          this.props.directRevenueArray
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
      email: this.state.email,
      benefits: this.state.benefits,
      questions: this.state.questions,
      general_topic: this.state.general_topic,
      ideal_client: this.state.ideal_client,
      investment: this.state.investment,
      templateCode: this.state.templateCode,
      template_id: parseInt(this.props.match.params.template_id),
      campaign_id: parseInt(this.props.match.params.saveOrUpdate),
    };
    this.props.updateCompaign(data);
  };
  removeBenefits = (index) => {
    this.state.benefits.splice(index, 1);
    this.setState({
      benefits: this.state.benefits,
    });
  };
  removeQuestions = (index) => {
    this.state.questions.splice(index, 1);
    this.setState({
      questions: this.state.questions,
    });
  };
  addBenefits() {
    this.setState({
      benefits: [...this.state.benefits, ""],
    });
  }
  addQuestions() {
    this.setState({
      questions: [...this.state.questions, ""],
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

  handleOnchangeBenefits(e, index) {
    this.state.benefits[index] = e.target.value;
    this.setState({
      benefits: this.state.benefits,
    });
  }
  handleOnchangeQuestions(e, index) {
    this.state.questions[index] = e.target.value;
    this.setState({
      questions: this.state.questions,
    });
  }
  render() {
    const { name, email, general_topic, ideal_client, investment } = this.state;

    return (
      <section>
        <div className="container">
          {this.state.embed_code == "" ? (
            ""
          ) : (
            <TemplateVideoComponent embed_code={this.state.embed_code} />
          )}

          <form onSubmit={this.handleOnsubmit}>
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
                    value={name}
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
                Your Email{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    required
                    placeholder="Enter Your Email Address"
                  ></input>
                </div>
              </div>
            </div>
            <div className="row pl-5 pr-5">
              <label className="pl-3 pr-5">
                General Topic{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="general_topic"
                    value={general_topic}
                    onChange={this.handleChange}
                    required
                    placeholder="Enter General Topic "
                  ></input>
                </div>
              </div>
            </div>
            <div className="row pl-5 pr-5">
              <label className="pl-3 pr-5">
                Ideal Client{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="ideal_client"
                    value={ideal_client}
                    onChange={this.handleChange}
                    required
                    placeholder="Please Write 4-6 Words "
                  ></input>
                </div>
              </div>
            </div>
            <div className="row pl-5 pr-5">
              <label className="pl-3 pr-5">
                Typical Coaching Investment{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="investment"
                    value={investment}
                    onChange={this.handleChange}
                    required
                    placeholder="Whats the investment for your coaching ?"
                  ></input>
                </div>
              </div>
            </div>
            <label className="row pl-5 pr-5">
              {" "}
              &nbsp; &nbsp;Client Questions{" "}
              <span className="required" style={{ color: "red" }}>
                *
              </span>{" "}
            </label>
            {this.state.questions.map((item, index) => (
              <div className="row pl-5 pr-5">
                <div className="col-md-10 col-xs-10 col-sm-10 col-lg-10">
                  <div className="form-group has-feedback">
                    <span class="input-group-addon">
                      <i class="glyphicon glyphicon-user"></i>
                    </span>
                    <input
                      className="form-control benft_input"
                      type="text"
                      placeholder={"Enter client question " + (index + 1)}
                      name="questions"
                      onChange={(e) => this.handleOnchangeQuestions(e, index)}
                      required
                      value={item}
                    />
                  </div>
                </div>
                <div className="col-md-2 col-xs-2 col-sm-2 col-lg-2">
                  <button
                    onClick={() => this.removeQuestions(index)}
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
                  onClick={(e) => this.addQuestions(e)}
                  className="btn btn-primary undefined"
                  type="button"
                  style={{ width: "130px" }}
                >
                  {" "}
                  + Add Question
                </button>
              </div>
            </div>
            <br />
            <label className="row pl-5 pr-5">
              {" "}
              &nbsp; &nbsp;Coaching Benefits{" "}
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
                      required
                      placeholder={"Enter coaching benefit " + (index + 1)}
                      name="benefits"
                      onChange={(e) => this.handleOnchangeBenefits(e, index)}
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
const mapStateToProps = (state) => {
  return {
    directRevenueArray: state.directRevenueReducer.directRevenueArray,
    template_list_array: state.templatesReducer.template_list_array,
    templates_questions_data: state.templatesReducer.templates_questions_data,
    update_response: state.directRevenueReducer.update_response,
  };
};

export default connect(mapStateToProps, action)(DirectRevenue);
