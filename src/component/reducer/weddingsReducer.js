import {
  SAVE_WEDDINGS,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const weddingsReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_WEDDINGS: {
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
export default weddingsReducer;
