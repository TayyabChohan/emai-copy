import {
  SAVE_GUITAR_NICHE,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const guitarNicheReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_GUITAR_NICHE: {
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
export default guitarNicheReducer;
