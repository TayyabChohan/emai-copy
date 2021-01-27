import {
  SAVE_PERSONAL_DEVELOPMENT_FORM,
  UPDATE_COMPAIGN,
} from "../actions/allActions";
const initailStae = {
  personalDevelopmentsArray: [],
  update_response: "",
};
const personalDevelopmentsReducer = (state = initailStae, action) => {
  switch (action.type) {
    case SAVE_PERSONAL_DEVELOPMENT_FORM: {
      return {
        ...state,
        personalDevelopmentsArray: action.response,
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
export default personalDevelopmentsReducer;
