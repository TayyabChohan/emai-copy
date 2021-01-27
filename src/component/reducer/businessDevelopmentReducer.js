import {
  SAVE_BUSINESS_DEVELOPMENT,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const businessDevelopmentReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_BUSINESS_DEVELOPMENT: {
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
export default businessDevelopmentReducer;
