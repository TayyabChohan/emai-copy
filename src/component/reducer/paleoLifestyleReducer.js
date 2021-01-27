import {
  SAVE_PALEO_LIFESTYLE,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const paleoLifestyleReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_PALEO_LIFESTYLE: {
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
export default paleoLifestyleReducer;
