import React, { Component } from "react";
import { get_template_list } from "../actions/templatesAction";
import { connect } from "react-redux";
const action = {
  get_template_list,
};
class TemplateVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enbale: false,
      embed_code: this.props.embed_code,
    };
  }
  hnaldeShowVideo = () => {
    this.setState({
      enbale: true,
    });
  };

  render() {
    const { embed_code } = this.state;
    return (
      <div className="container">
        <div className="row pl-5 pr-5 pt-4">
          {this.state.enbale === false ? (
            ""
          ) : (
            <div className="col-md-12 col-sm-12 col-lg-12">
              {embed_code === null ? (
                <img
                  className="watch_image1"
                  src={
                    window.location.origin +
                    "/asset/image/video-coming-soon.png"
                  }
                />
              ) : (
                <div className="embadCode">
                  <div dangerouslySetInnerHTML={{ __html: embed_code }} />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="row pl-5 pr-5 pt-4">
          {this.state.enbale === true ? (
            ""
          ) : (
            <div className="col-md-12 col-sm-12 col-lg-12">
              <img
                className="watch_image"
                onClick={this.hnaldeShowVideo}
                src={window.location.origin + "/asset/image/help-vdo-icon.png"}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    template_list_array: state.templatesReducer.template_list_array,
  };
};

export default connect(mapStateToProps, action)(TemplateVideoComponent);
