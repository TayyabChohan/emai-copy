import React, { Component } from "react";
import "../../mainStyleSheet/templateQuestions.css";
import { connect } from "react-redux";
import AlertMessage from "../AlertMessage";
import TemplateVideoComponent from "./TemplateVideoComponent";
import {
  saveSalesLetterPromoSequenceForm,
  updateCompaign,
} from "../actions/salesLetterPromoSequenceAction";
import { GetHeaderName, GetMenu } from "../actions/customerAction";
import {
  getTemplatesQuestionData,
  hideLoading,
  get_template_list,
} from "../actions/templatesAction";
// import { updateCompaign } from "../actions/campaignsAction";
const action = {
  GetHeaderName,
  saveSalesLetterPromoSequenceForm,
  get_template_list,
  getTemplatesQuestionData,
  updateCompaign,
  GetMenu,
  hideLoading,
};
export class SalesLetterPromoSequence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      name: "",
      download_type: "",
      download_name: "",
      download_link: "",
      website_url: "",
      contact_url: "",
      support_url: "",
      facebook_url: "",
      twitter_url: "",
      youtube_url: "",
      linkedin_url: "",
      benefits: ["", "", ""],
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
  handlensubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      product_name: this.state.product_name,
      product_topic: this.state.product_topic,
      sales_link: this.state.sales_link,
      core_desire: this.state.core_desire,
      testimonial_quote: this.state.testimonial_quote,
      testimonial_sender: this.state.testimonial_sender,
      benefits: this.state.benefits,
      templateCode: this.state.templateCode,
      template_id: this.state.template_id,
      tenant_id: localStorage.getItem("tenant_id"),
      compaignTitle: this.state.compaignTitle,
    };
    this.props.saveSalesLetterPromoSequenceForm(data);
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.templates_questions_data !==
        this.props.templates_questions_data &&
      this.props.templates_questions_data !== ""
    ) {
      this.setState({
        name: this.props.templates_questions_data.result.name,
        product_name: this.props.templates_questions_data.result.product_name,
        product_topic: this.props.templates_questions_data.result.product_topic,
        sales_link: this.props.templates_questions_data.result.sales_link,
        core_desire: this.props.templates_questions_data.result.core_desire,
        testimonial_quote: this.props.templates_questions_data.result
          .testimonial_quote,
        testimonial_sender: this.props.templates_questions_data.result
          .testimonial_sender,
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
      product_name: this.state.product_name,
      product_topic: this.state.product_topic,
      sales_link: this.state.sales_link,
      core_desire: this.state.core_desire,
      testimonial_quote: this.state.testimonial_quote,
      testimonial_sender: this.state.testimonial_sender,
      benefits: this.state.benefits,
      templateCode: this.state.templateCode,
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
  render() {
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
                    value={this.state.product_name}
                    onChange={this.handleChange}
                    placeholder="Enter Product Name"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Product Topic (General topic of the product - 2 or 3 words){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="product_topic"
                    value={this.state.product_topic}
                    onChange={this.handleChange}
                    placeholder="Enter Product Topic"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Product Sales Page Link{" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="sales_link"
                    value={this.state.sales_link}
                    required
                    onChange={this.handleChange}
                    placeholder="Enter Product Sales Page Link"
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Core Desire (Your prospect's main goal){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="core_desire"
                    value={this.state.core_desire}
                    onChange={this.handleChange}
                    required
                    placeholder="Enter Core Desire"
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Testimonial Quote (Quote of a testimonial or positive feedback
                you've received){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="testimonial_quote"
                    value={this.state.testimonial_quote}
                    onChange={this.handleChange}
                    required
                    placeholder="Enter Testimonial Quote"
                  ></input>
                </div>
              </div>
            </div>
            <div className="row  pl-5 pr-5">
              <label className="pl-3 pr-5">
                Testimonial Sender (Name of the person who sent the testimonial){" "}
                <span className="required" style={{ color: "red" }}>
                  *
                </span>{" "}
              </label>
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="form-group has-feedback">
                  <input
                    className="form-control"
                    type="text"
                    name="testimonial_sender"
                    value={this.state.testimonial_sender}
                    onChange={this.handleChange}
                    placeholder="Enter Testimonial Sender"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <label className="row pl-5 pr-5">
              {" "}
              &nbsp; &nbsp; Sales Letter Promo Sequence Benefits{" "}
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
                      required
                      className="form-control benft_input"
                      type="text"
                      placeholder={"Enter benefit " + (index + 1)}
                      name="benefits"
                      onChange={(e) => this.handleOnchange(e, index)}
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
const mapsToprops = (state) => {
  return {
    templateFormArray: state.salesLetterPromoSequenceReducer.templateFormArray,
    template_list_array: state.templatesReducer.template_list_array,
    update_response: state.salesLetterPromoSequenceReducer.update_response,
    templates_questions_data: state.templatesReducer.templates_questions_data,
  };
};

export default connect(mapsToprops, action)(SalesLetterPromoSequence);

// export default BondingSequence;
