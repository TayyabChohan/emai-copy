import {
  GET_COMPAIGNS,
  DELETE_COMPAIGN,
  UPDATE_COMPAIGN,
  HIDE_LOADING,
  GET_TEMPLATE_CAMPAIGN_NAME,
  UPDATE_CAMPAIGN_TITLE,
  GET_ONE_CAMPAIGN
} from "./allActions.js";
import axios from "axios";
import { toastr } from "react-redux-toastr";
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

export const updateCampaignTitle = (data) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}updateCampaignTitle`,
      data: data,
    };
    axios(options)
      .then((response) => {
        if (response.data.success === true) {
          dispatch({
            type: UPDATE_CAMPAIGN_TITLE,
            response: response,
          });
          toastr.success("Successfully", "Updated Campaign Name");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const getAllCompaigns = (data) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}getAllCompaigns`,
      data: data,
    };
    axios(options)
      .then((response) => {
        if (response.data.success === true) {
          dispatch({
            type: GET_COMPAIGNS,
            response: response.data.value.result,
            check: true,
          });
        } else if (response.data.success === false) {
          dispatch({
            type: GET_COMPAIGNS,
            response: [],
            check: false,
            serverError: false,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: GET_COMPAIGNS,
          response: [],
          check: false,
          serverError: true,
          warningCheck: true,
          error: err.message,
        });
      });
  };
};

export const getTemplateType = (data) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}getTemplateType`,
      data: data,
    };
    axios(options)
      .then((response) => {
        $.LoadingOverlay("show");
        if (response.data.success === true) {
          dispatch({
            type: GET_TEMPLATE_CAMPAIGN_NAME,
            response: response.data,
          });
          $.LoadingOverlay("hide");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
export const getOneCompaigns = (data) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}getOneCompaigns`,
      data: data,
    };
    axios(options)
      .then((response) => {
        $.LoadingOverlay("show");
        if (response.data.success === true) {
          dispatch({
            type: GET_ONE_CAMPAIGN,
            response: response.data.value.result,
          });
          $.LoadingOverlay("hide");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const deleteCompaign = (data) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}${data.deleteURL}`,
      data: data,
    };
    axios(options)
      .then((response) => {
        dispatch({
          type: DELETE_COMPAIGN,
          response: response.data,
          id: data.template_id,
          campaign_id: data.campaign_id,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
