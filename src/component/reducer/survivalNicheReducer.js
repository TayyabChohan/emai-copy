import {
  SAVE_SURVIVAL_NICHE_FORM,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const survivalNicheReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_SURVIVAL_NICHE_FORM: {
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
export default survivalNicheReducer;
