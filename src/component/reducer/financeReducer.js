import { SAVE_FINANCE_FORM, UPDATE_COMPAIGN } from "../actions/allActions";
const initailStae = {
  financeArray: [],
  update_response: "",
};
const financeReducer = (state = initailStae, action) => {
  switch (action.type) {
    case SAVE_FINANCE_FORM: {
      return {
        ...state,
        financeArray: action.response,
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
export default financeReducer;
