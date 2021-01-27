import {
  SAVE_BLOG_SEQUENCE_FORM,
  UPDATE_COMPAIGN,
} from "../actions/allActions";
const initailStae = {
  blogSequenceArray: [],
  update_response: "",
};
const blogSequenceReducer = (state = initailStae, action) => {
  switch (action.type) {
    case SAVE_BLOG_SEQUENCE_FORM: {
      return {
        ...state,
        blogSequenceArray: action.response,
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
export default blogSequenceReducer;
