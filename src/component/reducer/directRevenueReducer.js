import {
  SAVE_DIRECT_REVENUE,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  directRevenueArray: [],
  update_response: "",
};
const directRevenueReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_DIRECT_REVENUE: {
      return {
        ...state,
        directRevenueArray: action.response,
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
export default directRevenueReducer;
