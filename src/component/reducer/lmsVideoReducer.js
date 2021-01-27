import { SAVE_LMS_VIDEO_FORM, UPDATE_COMPAIGN } from "../actions/allActions";
const initailStae = {
  lmsVideoArray: [],
  update_response: "",
};
const lmsVideoReducer = (state = initailStae, action) => {
  switch (action.type) {
    case SAVE_LMS_VIDEO_FORM: {
      return {
        ...state,
        lmsVideoArray: action.response,
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
export default lmsVideoReducer;
