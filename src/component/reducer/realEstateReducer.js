import { SAVE_REAL_ESTATE_FORM, UPDATE_COMPAIGN } from "../actions/allActions";
const initailStae = {
  realEstateArray: [],
  update_response: "",
};
const realEstateReducer = (state = initailStae, action) => {
  switch (action.type) {
    case SAVE_REAL_ESTATE_FORM: {
      return {
        ...state,
        realEstateArray: action.response,
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
export default realEstateReducer;
