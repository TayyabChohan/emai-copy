import React, { Component } from "react";
import "../../mainStyleSheet/templateQuestions.css";
import { connect } from "react-redux";
import "flatpickr/dist/themes/material_green.css";
import {
  saveWaitingListRelaunchForm,
  updateCompaign,
} from "../actions/waitingListRelaunchAction";
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
  saveWaitingListRelaunchForm,
  get_template_list,
  getTemplatesQuestionData,
  updateCompaign,
  GetMenu,
  hideLoading,
};
export class WaitingListRelaunch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      enbale: false,
      templateCode: "",
      template_id: "",
      compaignTitle: "",
      relaunch_link: "",
      next_launch: "",
      product_name: "",
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
  handleOnsubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      relaunch_link: this.state.relaunch_link,
      next_launch: this.state.next_launch,
      product_name: this.state.product_name,
      templateCode: this.state.templateCode,
      template_id: this.state.template_id,
      tenant_id: localStorage.getItem("tenant_id"),
      compaignTitle: this.state.compaignTitle,
    };
    this.props.saveWaitingListRelaunchForm(data);
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
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.templates_questions_data !==
        this.props.templates_questions_data &&
      this.props.templates_questions_data !== ""
    ) {
      this.setState({
        name: this.props.templates_questions_data.result.name,
        product_name: this.props.templates_questions_data.result.product_name,
        relaunch_link: this.props.templates_questions_data.result.relaunch_link,
        next_launch: this.props.templates_questions_data.result.next_launch,
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
  updateCompaignData = () => {
    const data = {
      name: this.state.name,
      relaunch_link: this.state.relaunch_link,
      next_launch: this.state.next_launch,
      product_name: this.state.product_name,
      templateCode: this.state.templateCode,
      template_id: parseInt(this.props.match.params.template_id),
      campaign_id: parseInt(this.props.match.params.saveOrUpdate),
    };
    this.props.updateCompaign(data);
  };
  render() {
    const {
      embed_code,
      name,
      relaunch_link,
      next_launch,
      product_name,
    } = this.state;
    return (
      <div className="container">
        {this.state.embed_code === "" ? (
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
                  required
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter Your Name"
                ></input>
              </div>
            </div>
          </div>
          <div className="row pl-5 pr-5">
            <label className="pl-3 pr-5">
              {" "}
              Product Name{" "}
              <span className="required" style={{ color: "red" }}>
                *
              </span>{" "}
            </label>
            <div className="col-md-12 col-sm-12 col-lg-12">
              <div className="form-group has-feedback">
                <input
                  className="form-control"
                  type="text"
                  name="product_name"
                  value={product_name}
                  required
                  onChange={this.handleChange}
                  placeholder="Enter Product Name thats currently closed"
                ></input>
              </div>
            </div>
          </div>
          <div className="row  pl-5 pr-5">
            <label className="pl-3 pr-5">
              Next Launch{" "}
              <span className="required" style={{ color: "red" }}>
                *
              </span>{" "}
            </label>
            <div className="col-md-12 col-sm-12 col-lg-12">
              <div className="form-group has-feedback">
                <input
                  className="form-control"
                  type="text"
                  name="next_launch"
                  value={next_launch}
                  required
                  onChange={this.handleChange}
                  placeholder="Enter Number of Months Until the next Launch"
                ></input>
              </div>
            </div>
          </div>
          <div className="row  pl-5 pr-5">
            <label className="pl-3 pr-5">
              Relaunch Link{" "}
              <span className="required" style={{ color: "red" }}>
                *
              </span>{" "}
            </label>
            <div className="col-md-12 col-sm-12 col-lg-12">
              <div className="form-group has-feedback">
                <input
                  className="form-control"
                  type="text"
                  name="relaunch_link"
                  value={relaunch_link}
                  required
                  onChange={this.handleChange}
                  placeholder="Please Enter Relaunch Link To Order form"
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
          <br />
          <br />
        </form>
      </div>
    );
  }
}
const mapsToprops = (state) => {
  return {
    templateFormArray: state.waitingListRelaunchReducer.templateFormArray,
    template_list_array: state.templatesReducer.template_list_array,
    templates_questions_data: state.templatesReducer.templates_questions_data,
    update_response: state.waitingListRelaunchReducer.update_response,
  };
};

export default connect(mapsToprops, action)(WaitingListRelaunch);

// export default WaitingListRelaunch;
