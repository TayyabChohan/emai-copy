import {
  SAVE_SURVIVAL_MENS_EX_BACK,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const mensExBackReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_SURVIVAL_MENS_EX_BACK: {
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
export default mensExBackReducer;
