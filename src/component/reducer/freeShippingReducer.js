import {
  SAVE_FREE_SHIPPING_FORM,
  UPDATE_COMPAIGN,
} from "../actions/allActions";
const initailStae = {
  freeShippingArray: [],
  update_response: "",
};
const freeShippingReducer = (state = initailStae, action) => {
  switch (action.type) {
    case SAVE_FREE_SHIPPING_FORM: {
      return {
        ...state,
        freeShippingArray: action.response,
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
export default freeShippingReducer;
