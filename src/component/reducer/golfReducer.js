import { SAVE_GOLF, UPDATE_COMPAIGN } from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const golfReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_GOLF: {
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
export default golfReducer;
