import {
  HEADER_NAME,
  MENU,
  GET_TEMPLATE_CAMPAIGN_NAME,
} from "../../component/actions/allActions";

const initialSate = {
  template_campaign_name: [],
  headerName_array: [],
  nemu_array: [],
};
const customerReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_TEMPLATE_CAMPAIGN_NAME: {
      return {
        ...state,
        template_campaign_name: action.response,
      };
    }
    case HEADER_NAME: {
      return {
        ...state,
        headerName_array: action.response,
      };
    }
    case MENU: {
      return {
        ...state,
        nemu_array: action.response,
      };
    }
    default:
      return state;
  }
};
export default customerReducer;
