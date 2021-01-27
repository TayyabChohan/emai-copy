import {
  SAVE_TEMPLATE_WAITING_LIST_RELAUNCH,
  UPDATE_COMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  templateFormArray: [],
  update_response: "",
};
const waitingListRelaunchReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SAVE_TEMPLATE_WAITING_LIST_RELAUNCH: {
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
export default waitingListRelaunchReducer;
