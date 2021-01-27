import React, { Component } from "react";
import { connect } from "react-redux";
import "../../mainStyleSheet/templateQuestions.css";
import AlertMessage from "../AlertMessage";
import {
  saveSurverySequenceForm,
  updateCompaign,
} from "../actions/surveySequenceAction";
import { GetHeaderName, GetMenu } from "../actions/customerAction";
import {
  getTemplatesQuestionData,
  hideLoading,
  get_template_list,
} from "../actions/templatesAction";
// import { updateCompaign } from "../actions/campaignsAction";
import TemplateVideoComponent from "./TemplateVideoComponent";
const action = {
  saveSurverySequenceForm,
  GetHeaderName,
  get_template_list,
  GetMenu,
  getTemplatesQuestionData,
  updateCompaign,
  hideLoading,
};
export class SurveySequence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      name: "",
      survey_link: "",
      results_link: "",
      enbale: false,
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
  handleOnsubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      survey_link: this.state.survey_link,
      results_link: this.state.results_link,
      templateCode: this.state.templateCode,
      template_id: this.state.template_id,
      tenant_id: localStorage.getItem("tenant_id"),
      compaignTitle: this.state.compaignTitle,
    };
    this.props.saveSurverySequenceForm(data);
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.templates_questions_data !==
        this.props.templates_questions_data &&
      this.props.templates_questions_data !== ""
    ) {
      this.setState({
        results_link: this.props.templates_questions_data.result.results_link,
        survey_link: this.props.templates_questions_data.result.survey_link,
        name: this.props.templates_questions_data.result.name,
      });
      const data1 = {
        loading: true,
      };
      this.props.hideLoading(data1);
    }
    if (
      prevProps.surveyFormArray !== this.props.surveyFormArray &&
      this.props.surveyFormArray !== ""
    ) {
      this.props.history.push({
        pathname: `/previewemail/${
          this.props.surveyFormArray
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
      survey_link: this.state.survey_link,
      name: this.state.name,
      results_link: this.state.results_link,
      templateCode: this.state.templateCode,
      template_id: parseInt(this.props.match.params.template_id),
      campaign_id: parseInt(this.props.match.params.saveOrUpdate),
    };
    this.props.updateCompaign(data);
  };
  render() {
    const { name, survey_link, results_link } = this.state;
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
                Survey Link{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="survey_link"
                    value={survey_link}
                    onChange={this.handleChange}
                    placeholder="EnterSurvey Link"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row pl-5 pr-5">
              <label className="pl-3 pr-5">
                Results Link{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="results_link"
                    value={results_link}
                    onChange={this.handleChange}
                    placeholder="Enter Results Link"
                    required
                  ></input>
                </div>
              </div>
            </div>

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
    surveyFormArray: state.surveySequenceReducer.surveyFormArray,
    headerName_array: state.customerReducer.headerName_array,
    templates_questions_data: state.templatesReducer.templates_questions_data,
    update_response: state.surveySequenceReducer.update_response,
    template_list_array: state.templatesReducer.template_list_array,
  };
};

export default connect(mapStateToProps, action)(SurveySequence);
