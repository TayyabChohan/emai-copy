import {
  GET_EMAILS,
  GET_CLICKBANK_PRODUCTS,
  HIDE_LOADING,
} from "../../component/actions/allActions";

const initialSate = {
  emailArray: [],
  customEmails: [],
  clickbankProductsArray: [],
};
const emailViewReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_EMAILS: {
      return {
        ...state,
        emailArray: action.response,
      };
    }
    case HIDE_LOADING: {
      return {
        ...state,
        loadingArray: action.response,
      };
    }
    case GET_CLICKBANK_PRODUCTS: {
      return {
        ...state,
        clickbankProductsArray: action.response,
      };
    }
    default:
      return state;
  }
};
export default emailViewReducer;
