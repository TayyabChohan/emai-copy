import {
  SAVE_TEMPLATE_LMS_REPORT,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const leadMagnetSequenceReportReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_TEMPLATE_LMS_REPORT: {
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
export default leadMagnetSequenceReportReducer;
