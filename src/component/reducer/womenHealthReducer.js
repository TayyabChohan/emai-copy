import {
  SAVE_WOMEN_HEALTH,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const womenHealthReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_WOMEN_HEALTH: {
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
export default womenHealthReducer;
