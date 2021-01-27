import {
  GET_TEMPLATES_QUESTIONS,
  GET_TEMPLATE_LIST,
  HIDE_LOADING,
} from "./allActions.js";
import axios from "axios";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
export const hideLoading = (data) => {
  return (dispatch) => {
    dispatch({
      type: HIDE_LOADING,
      response: data,
    });
  };
};
export const getTemplatesQuestionData = (data) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}templateQuestionsData`,
      data: data,
    };
    axios(options)
      .then((response) => {
        $.LoadingOverlay("show");
        if (response.data.success === true) {
          dispatch({
            type: GET_TEMPLATES_QUESTIONS,
            response: response.data.value,
          });
          $.LoadingOverlay("hide");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const get_template_list = () => {
  return (dispatch) => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}getTemplates`,
    };
    axios(options)
      .then((response) => {
        if (response.data.success === true) {
          dispatch({
            type: GET_TEMPLATE_LIST,
            response: response.data.values.result,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
