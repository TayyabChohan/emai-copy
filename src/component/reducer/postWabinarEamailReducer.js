import { SAVE_POST_WABINAR_FORM, UPDATE_COMPAIGN } from "../actions/allActions";
const initailStae = {
  savePostWabinarArray: [],
  update_response: "",
};
const postWabinarReducer = (state = initailStae, action) => {
  switch (action.type) {
    case SAVE_POST_WABINAR_FORM: {
      return {
        ...state,
        savePostWabinarArray: action.response,
      };
    }
    case UPDATE_COMPAIGN: {
      return {
        ...state,
        update_response: action.response,
      };
    }
    default:
      return state;
  }
};
export default postWabinarReducer;
