import {
  SAVE_TEMPLATE_PRE_WEBINAR,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const prewebinarofferReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_TEMPLATE_PRE_WEBINAR: {
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
export default prewebinarofferReducer;
