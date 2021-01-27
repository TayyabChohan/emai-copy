import {
  SAVE_MENS_DATING,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const mensDatingReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_MENS_DATING: {
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
export default mensDatingReducer;
