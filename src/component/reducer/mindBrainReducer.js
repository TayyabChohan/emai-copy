import {
  SAVE_MIND_BRAIN,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const mindBrainReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_MIND_BRAIN: {
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
export default mindBrainReducer;
