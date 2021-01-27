import { SAVE_PLASH_SALE_FORM, UPDATE_COMPAIGN } from "../actions/allActions";
const initailStae = {
  saveflashSaleArray: [],
  update_response: "",
};
const flasSAleReducer = (state = initailStae, action) => {
  switch (action.type) {
    case SAVE_PLASH_SALE_FORM: {
      return {
        ...state,
        saveflashSaleArray: action.response,
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
export default flasSAleReducer;
