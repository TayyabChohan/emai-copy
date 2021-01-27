import {
  SAVE_BUSINESS_OPPORTUNITY,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const businessOpportunityReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_BUSINESS_OPPORTUNITY: {
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
export default businessOpportunityReducer;
