import { SAVE_FREE_SHIPPING_FORM, UPDATE_COMPAIGN } from "./allActions";
import axios from "axios";
import { toastr } from "react-redux-toastr";
export const savefreeShippingForm = (data) => {
  return (dispatch) => {
    const option = {
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}savefreeShippingForm`,
      data: data,
    };
    axios(option)
      .then((response) => {
        if (response.data.success === true) {
          dispatch({
            type: SAVE_FREE_SHIPPING_FORM,
            response: response.data.values.compaignID,
          });
          toastr.success("Successfully", "Added Template");
        } else {
          toastr.error("Error", "Template Not Added");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const updateCompaign = (data) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}updateFreeShippingtemplate`,
      data: data,
    };
    axios(options)
      .then((response) => {
        if (response.data.success === true) {
          dispatch({
            type: UPDATE_COMPAIGN,
            response: response.data,
          });
          toastr.success("Successfully", "Updated Campaign");
        } else {
          toastr.error("Error", "Campaigns Not Found");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
