import React, { Component } from "react";
import "../../mainStyleSheet/templateQuestions.css";
import { connect } from "react-redux";
import AlertMessage from "../AlertMessage";
import TemplateVideoComponent from "./TemplateVideoComponent";
import {
  savePaleoLifestyleForm,
  updateCompaign,
} from "../actions/paleoLifestyleAction";
import { GetHeaderName, GetMenu } from "../actions/customerAction";
import {
  getTemplatesQuestionData,
  hideLoading,
  get_template_list,
} from "../actions/templatesAction";
// import { updateCompaign } from "../actions/campaignsAction";
const action = {
  GetHeaderName,
  savePaleoLifestyleForm,
  get_template_list,
  getTemplatesQuestionData,
  updateCompaign,
  GetMenu,
  hideLoading,
};
export class PaleoLifestyle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      clickbank_id: "",
      enbale: false,
      templateCode: "",
      template_id: "",
      compaignTitle: "",
      embed_code: "",
    };
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
  updateCompaignData = () => {
    const data = {
      name: this.state.name,
      clickbank_id: this.state.clickbank_id,
      templateCode: this.state.templateCode,
      compaignTitle: this.state.compaignTitle,
      template_id: parseInt(this.props.match.params.template_id),
      campaign_id: parseInt(this.props.match.params.saveOrUpdate),
    };
    this.props.updateCompaign(data);
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
      templateCode: this.state.templateCode,
      template_id: this.state.template_id,
      tenant_id: localStorage.getItem("tenant_id"),
      compaignTitle: this.state.compaignTitle,
    };
    this.props.savePaleoLifestyleForm(data);
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
  render() {
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
                    value={this.state.clickbank_id}
                    onChange={this.handleChange}
                    placeholder="Enter Your Clickbank ID"
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
const mapsToprops = (state) => {
  return {
    templateFormArray: state.paleoLifestyleReducer.templateFormArray,
    template_list_array: state.templatesReducer.template_list_array,
    templates_questions_data: state.templatesReducer.templates_questions_data,
    update_response: state.paleoLifestyleReducer.update_response,
  };
};

export default connect(mapsToprops, action)(PaleoLifestyle);
