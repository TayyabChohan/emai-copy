import {
  SAVE_TEMPLATE_COLD_PROSPECTING,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const coldSimpleProspectingEmailReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_TEMPLATE_COLD_PROSPECTING: {
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
export default coldSimpleProspectingEmailReducer;
