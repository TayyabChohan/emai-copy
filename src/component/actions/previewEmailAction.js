import {
  GET_EMAILS,
  GET_CLICKBANK_PRODUCTS,
  HIDE_LOADING,
} from "./allActions.js";
import axios from "axios";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
export const selectEmailsfromCustomTables = (data) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}selectEmailsCustom`,
      data: data,
    };
    axios(options)
      .then((response) => {
        $.LoadingOverlay("show")
        if (response.data.success === true) {

          dispatch({ type: GET_EMAILS, response: response.data.value.result });
          dispatch({
            type: GET_CLICKBANK_PRODUCTS,
            response: response.data.value.clickbankProducts,
          });
          $.LoadingOverlay("hide")
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
export const hideLoading = (data) => {
  return (dispatch) => {
    dispatch({
      type: HIDE_LOADING,
      response: data,
    });
  };
};
export const downloadCustomEmails = (data) => {
  return (dispatch) => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}downloadEmailsCustom?tenant_id=${data.tenant_id}&campaign_id=${data.campaign_id}&title=${data.title}`,
      // data: data,
    };
    axios(options)
      .then((response) => {
        console.log(data);
        return new Blob([response.data || ""], { type: "text/plain" });
      })
      .then(function (blob) {
        const element = document.createElement("a");
        element.href = URL.createObjectURL(blob);
        element.download =
          `${data.title.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, "")}` +
          "-" +
          `${data.campaign_id}` +
          ".txt";
        document.body.appendChild(element);
        element.click();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
