import { SAVE_MENFITNESS_FORM, UPDATE_COMPAIGN } from "../actions/allActions";
const initailStae = {
  menFitnessArray: [],
  update_response: "",
};
const menFitnessReducer = (state = initailStae, action) => {
  switch (action.type) {
    case SAVE_MENFITNESS_FORM: {
      return {
        ...state,
        menFitnessArray: action.response,
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
export default menFitnessReducer;
