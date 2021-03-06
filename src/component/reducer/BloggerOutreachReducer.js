import {
  SAVE_TEMPLATE_BLOGGER_OUTREACH,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const BloggerOutreachReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_TEMPLATE_BLOGGER_OUTREACH: {
      return {
        ...state,
        templateFormArray: action.response,
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
export default BloggerOutreachReducer;
