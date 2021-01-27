import React, { Component } from "react";
import "../../mainStyleSheet/templateQuestions.css";
import { connect } from "react-redux";
import AlertMessage from "../AlertMessage";
import { GetHeaderName, GetMenu } from "../actions/customerAction";
import {
  saveReAgaementForm,
  updateCompaign,
} from "../actions/reengagementAction";
import TemplateVideoComponent from "./TemplateVideoComponent";
import {
  getTemplatesQuestionData,
  hideLoading,
  get_template_list,
} from "../actions/templatesAction";
// import { updateCompaign } from "../actions/campaignsAction";
const action = {
  GetHeaderName,
  saveReAgaementForm,
  get_template_list,
  getTemplatesQuestionData,
  updateCompaign,
  GetMenu,
  hideLoading,
};
export class ReEngagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      name: "",
      freebie_link: "",
      benefits: ["", "", ""],
      enbale: false,
      templateCode: "",
      compaignTitle: "",
      template_id: "",
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
  handleOnchange(e, index) {
    this.state.benefits[index] = e.target.value;
    this.setState({
      benefits: this.state.benefits,
    });
  }
  handleOnsubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      freebie_link: this.state.freebie_link,
      benefits: this.state.benefits,
      templateCode: this.state.templateCode,
      template_id: this.state.template_id,
      tenant_id: localStorage.getItem("tenant_id"),
      compaignTitle: this.state.compaignTitle,
    };
    this.props.saveReAgaementForm(data);
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.templates_questions_data !==
        this.props.templates_questions_data &&
      this.props.templates_questions_data !== ""
    ) {
      this.setState({
        name: this.props.templates_questions_data.result.name,
        freebie_link: this.props.templates_questions_data.result.freebie_link,
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
      prevProps.reEngemantFormArray !== this.props.reEngemantFormArray &&
      this.props.reEngemantFormArray !== ""
    ) {
      this.props.history.push({
        pathname: `/previewemail/${
          this.props.reEngemantFormArray
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
      freebie_link: this.state.freebie_link,
      name: this.state.name,
      benefits: this.state.benefits,
      templateCode: this.state.templateCode,
      template_id: parseInt(this.props.match.params.template_id),
      campaign_id: parseInt(this.props.match.params.saveOrUpdate),
    };
    this.props.updateCompaign(data);
  };

  render() {
    const { name, freebie_link, embed_code } = this.state;
    return (
      <section>
        <form onSubmit={this.handleOnsubmit}>
          <div className="container">
            {this.state.embed_code == "" ? (
              ""
            ) : (
              <TemplateVideoComponent embed_code={this.state.embed_code} />
            )}

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
                Freebie Link{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="freebie_link"
                    value={freebie_link}
                    onChange={this.handleChange}
                    placeholder="Enter Freebie Link"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <label className="row pl-5 pr-5">
              {" "}
              &nbsp; &nbsp;Re-Engement Benefits{" "}
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
                      placeholder={"Enter Webinar Benefit " + (index + 1)}
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
            <br />
            <br />
          </div>
        </form>
        <AlertMessage />
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    headerName_array: state.customerReducer.headerName_array,
    reEngemantFormArray: state.reEngagementReducer.reEngemantFormArray,
    template_list_array: state.templatesReducer.template_list_array,
    templates_questions_data: state.templatesReducer.templates_questions_data,
    update_response: state.compaignsReducer.update_response,
  };
};

export default connect(mapStateToProps, action)(ReEngagement);
