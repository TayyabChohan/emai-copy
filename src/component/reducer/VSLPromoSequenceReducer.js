import {
  SAVE_TEMPLATE_VSL_PROMO,
  UPDATE_COMPAIGN,
} from "../actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const VSLPromoSequenceReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_TEMPLATE_VSL_PROMO: {
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
export default VSLPromoSequenceReducer;
