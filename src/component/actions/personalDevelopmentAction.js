import {
  SAVE_PERSONAL_DEVELOPMENT_FORM,
  UPDATE_COMPAIGN,
} from "./allActions.js";
import axios from "axios";
import { toastr } from "react-redux-toastr";
export const savePersonalDevelopmentsForm = (data) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}savePersonalDevelopmentsForm`,
      data: data,
    };
    axios(options)
      .then((response) => {
        if (response.data.success === true) {
          dispatch({
            type: SAVE_PERSONAL_DEVELOPMENT_FORM,
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
      url: `${process.env.REACT_APP_API_URL}updatePersonalDevsTemplate`,
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
