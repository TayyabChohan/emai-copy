import { UPDATE_EMAIL } from "./allActions.js";
import axios from "axios";
import { toastr } from "react-redux-toastr";
export const updateEmail = (data) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}updateEmail`,
      data: data,
    };
    axios(options)
      .then((response) => {
        if (response.data.success === true) {
          toastr.success("Successfully", "Updated Email");
          dispatch({
            type: UPDATE_EMAIL,
            response: response.data,
          });
          toastr.success("Successfully", "Updated Email");
        } else {
          toastr.error("Error", "Email Not Updated");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
