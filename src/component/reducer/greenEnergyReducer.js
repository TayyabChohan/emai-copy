import {
  SAVE_GREEN_ENERGY,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const greenEnergyReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_GREEN_ENERGY: {
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
export default greenEnergyReducer;
