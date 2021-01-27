import { SAVE_DOG_TRAINING_FOMR, UPDATE_COMPAIGN } from "../actions/allActions";
const initailStae = {
  dogTrainingArray: [],
  update_response: "",
};
const dogTrainingReducer = (state = initailStae, action) => {
  switch (action.type) {
    case SAVE_DOG_TRAINING_FOMR: {
      return {
        ...state,
        dogTrainingArray: action.response,
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
export default dogTrainingReducer;
