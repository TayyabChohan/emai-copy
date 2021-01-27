import { SAVE_WOMENEXBACK, UPDATE_COMPAIGN } from "../actions/allActions";
const initailStae = {
  womenexbackArray: [],
  update_response: "",
};
const womenExbackReducer = (state = initailStae, action) => {
  switch (action.type) {
    case SAVE_WOMENEXBACK: {
      return {
        ...state,
        womenexbackArray: action.response,
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
export default womenExbackReducer;
