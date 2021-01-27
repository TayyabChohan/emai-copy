import {
  SAVE_STRATEGY_SESSION_FORM,
  UPDATE_COMPAIGN,
} from "../actions/allActions";
const initailStae = {
  strategySessionArray: [],
  update_response: "",
};
const strategySessionReducer = (state = initailStae, action) => {
  switch (action.type) {
    case SAVE_STRATEGY_SESSION_FORM: {
      return {
        ...state,
        strategySessionArray: action.response,
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
export default strategySessionReducer;
