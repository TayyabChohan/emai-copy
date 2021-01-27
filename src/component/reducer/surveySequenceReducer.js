import {
  SAVE_SURVEY_FORM,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  surveyFormArray: [],
  update_response: "",
};
const surveySequenceReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_SURVEY_FORM: {
      return {
        ...state,
        surveyFormArray: action.response,
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
export default surveySequenceReducer;
