import { HEADER_NAME, MENU } from "./allActions";

export const GetHeaderName = (data) => {
  return (dispatch) => {
    dispatch({
      type: HEADER_NAME,
      response: data,
    });
  };
};
export const GetMenu = (data) => {
  console.log(data)
  return (dispatch) => {
    dispatch({
      type: MENU,
      response: data,
    });
  };
};
