import {
  GET_TEMPLATES_QUESTIONS,
  GET_TEMPLATE_LIST,
  HIDE_LOADING
} from "../../component/actions/allActions";

const initialSate = {
  templates_questions_data: [],
  template_list_array: [],
  loadingArray:false,
};
const templatesReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_TEMPLATES_QUESTIONS: {
      return {
        ...state,
        templates_questions_data: action.response,
      };
    }
    case HIDE_LOADING:{
      return{
        ...state,
        loadingArray:action.response
      }
    }
    case GET_TEMPLATE_LIST: {
      return {
        ...state,
        template_list_array: action.response,
      };
    }
    default:
      return state;
  }
};
export default templatesReducer;
