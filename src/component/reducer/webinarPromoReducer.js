import {
  SAVE_WABINAR_PROMO_FORM,
  UPDATE_COMPAIGN,
} from "../actions/allActions";
const initailStae = {
  webinarPromoArray: [],
  update_response: "",
};
const webinarPromoReducer = (state = initailStae, action) => {
  switch (action.type) {
    case SAVE_WABINAR_PROMO_FORM: {
      return {
        ...state,
        webinarPromoArray: action.response,
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
export default webinarPromoReducer;
