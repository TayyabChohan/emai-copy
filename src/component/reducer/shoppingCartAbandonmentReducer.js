import {
  SAVE_TEMPLATE_SHOPPING_CART_ABANDONMENT,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const shoppingCartAbandonmentReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_TEMPLATE_SHOPPING_CART_ABANDONMENT: {
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
export default shoppingCartAbandonmentReducer;
