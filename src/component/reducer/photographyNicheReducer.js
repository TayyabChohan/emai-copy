import {
  SAVE_PHOTOGRAPHY_NIECHE_FORM,
  UPDATE_COMPAIGN,
} from "../actions/allActions";
const initailStae = {
  photographyNicheArray: [],
  update_response: "",
};
const photographyNicheReducer = (state = initailStae, action) => {
  switch (action.type) {
    case SAVE_PHOTOGRAPHY_NIECHE_FORM: {
      return {
        ...state,
        photographyNicheArray: action.response,
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
export default photographyNicheReducer;
