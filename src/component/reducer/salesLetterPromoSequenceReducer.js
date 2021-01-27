import {
  SAVE_TEMPLATE_SALES_LETTER_PROMO,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const salesLetterPromoSequenceReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_TEMPLATE_SALES_LETTER_PROMO: {
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
export default salesLetterPromoSequenceReducer;
