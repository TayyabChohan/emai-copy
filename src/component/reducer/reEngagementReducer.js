import {
  SAVE_RE_ANGEMENT,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  reEngemantFormArray: [],
  update_response: "",
};
const reEngagementReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_RE_ANGEMENT: {
      return {
        ...state,
        reEngemantFormArray: action.response,
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
export default reEngagementReducer;
