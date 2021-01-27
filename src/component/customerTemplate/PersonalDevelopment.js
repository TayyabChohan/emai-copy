import React, { Component } from "react";
import "../../mainStyleSheet/templateQuestions.css";
import "flatpickr/dist/themes/material_green.css";
import { connect } from "react-redux";
import {
  savePersonalDevelopmentsForm,
  updateCompaign,
} from "../actions/personalDevelopmentAction";
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
  savePersonalDevelopmentsForm,
  get_template_list,
  getTemplatesQuestionData,
  updateCompaign,
  GetMenu,
  hideLoading,
};
class PersonalDevelopment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      benefits: ["", "", ""],
      enbale: false,
      templateCode: "",
      template_id: "",
      compaignTitle: "",
      compaignID: "",
      name: "",
      clickbank_id: "",
      mindmovies_id: "",
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
  handlensubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      clickbank_id: this.state.clickbank_id,
      benefits: this.state.benefits,
      mindmovies_id: this.state.mindmovies_id,
      calltoaction_Link: this.state.calltoaction_Link,
      templateCode: this.state.templateCode,
      template_id: this.state.template_id,
      tenant_id: localStorage.getItem("tenant_id"),
      compaignTitle: this.state.compaignTitle,
    };
    this.props.savePersonalDevelopmentsForm(data);
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.templates_questions_data !==
        this.props.templates_questions_data &&
      this.props.templates_questions_data !== ""
    ) {
      this.setState({
        name: this.props.templates_questions_data.result.name,
        clickbank_id: this.props.templates_questions_data.result.clickbank_id,
        mindmovies_id: this.props.templates_questions_data.result.mindmovies_id,
      });
      const data1 = {
        loading: true,
      };
      this.props.hideLoading(data1);
    }

    if (
      prevProps.personalDevelopmentsArray !==
        this.props.personalDevelopmentsArray &&
      this.props.personalDevelopmentsArray !== ""
    ) {
      this.props.history.push({
        pathname: `/previewemail/${
          this.props.personalDevelopmentsArray
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

  hnaldeShowVideo = () => {
    this.setState({
      enbale: true,
    });
  };
  updateCompaignData = () => {
    const data = {
      name: this.state.name,
      clickbank_id: this.state.clickbank_id,
      templateCode: this.state.templateCode,
      mindmovies_id: this.state.mindmovies_id,
      template_id: parseInt(this.props.match.params.template_id),
      campaign_id: parseInt(this.props.match.params.saveOrUpdate),
    };
    this.props.updateCompaign(data);
  };
  render() {
    const { name, clickbank_id, mindmovies_id } = this.state;
    return (
      <section>
        <div className="container">
          {this.state.embed_code == "" ? (
            ""
          ) : (
            <TemplateVideoComponent embed_code={this.state.embed_code} />
          )}
          <form id="statusCheck" onSubmit={this.handlensubmit}>
            <div className="row pl-5 pr-5">
              <label className="pl-3 pr-5">
                {" "}
                Your Name{" "}
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
                    value={name}
                    onChange={this.handleChange}
                    placeholder="Enter Your Name"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row pl-5 pr-5">
              <label className="pl-3 pr-5">
                {" "}
                Clickbank ID{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="clickbank_id"
                    value={clickbank_id}
                    onChange={this.handleChange}
                    placeholder="Enter ClickBack Id"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row pl-5 pr-5">
              <label className="pl-3 pr-5">
                {" "}
                Mind Movies ID{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="mindmovies_id"
                    value={mindmovies_id}
                    onChange={this.handleChange}
                    placeholder="Enter Mind Movies ID"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row pl-5 pr-5">
              <label className="pl-3 pr-5">
                {" "}
                Mind Movies Notes{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <p>The mindmovies_id is a 5-digit number.</p>
                  <p>
                    In order to promote Mind Movies offers (offers 1,3, and 6 in
                    the series below), you will need to [click here] to sign up
                    as a Mind Movies affiliate first. Please fill out the form
                    completely, including a valid Paypal email address, so that
                    you will be registered and paid out accordingly
                  </p>
                  <p>
                    Here’s the link to sign up:
                    <a
                      target="_blank"
                      href="https://jv.mindmovies.com/signup/signup.php?25257"
                    >
                      {" "}
                      https://jv.mindmovies.com/signup/signup.php?25257
                    </a>
                  </p>
                  <p>
                    After signing up, you will receive a Welcome confirmation
                    email with your login credentials to their affiliate system,
                    and more importantly, your 5-digit Mind Movies Affiliate ID
                    - this is the affiliate ID you will need to insert into
                    Email Copy App in order to correctly pre-populate your
                    links.
                  </p>
                  <p>
                    Please also note the Mind Movies Commissions Policy: Mind
                    Movies commissions go through a 60-day pending process
                    before becoming approved. Approved commissions that meet the
                    minimum payout threshold of $100 are paid via Paypal on the
                    15th of each month, unless that falls on a weekend or
                    holiday, then it’s the following business day
                  </p>
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
const mapsToprops = (state) => {
  return {
    personalDevelopmentsArray:
      state.personalDevelopmentsReducer.personalDevelopmentsArray,
    template_list_array: state.templatesReducer.template_list_array,
    update_response: state.personalDevelopmentsReducer.update_response,
    templates_questions_data: state.templatesReducer.templates_questions_data,
  };
};

export default connect(mapsToprops, action)(PersonalDevelopment);
