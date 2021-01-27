import {
  SAVE_TEMPLATE_LMS_SERIES,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const leadMagnetSequenceMultipleVideoReducer = (
  state = initialSate,
  action
) => {
  switch (action.type) {
    case SAVE_TEMPLATE_LMS_SERIES: {
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
export default leadMagnetSequenceMultipleVideoReducer;
