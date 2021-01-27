import {
  GET_COMPAIGNS,
  DELETE_COMPAIGN,
  HIDE_LOADING,
  GET_ONE_CAMPAIGN,
} from "../../component/actions/allActions";

const initialSate = {
  compaign_array: [],
  delete_response: "",
  update_response: "",
  checkArray: "",
  loadingArray: false,
  serverError: false,
  warningCheck: false,
  error: "",
  oneCampaign: '',
};
const compaignsReducer = (state = initialSate, action) => {
  switch (action.type) {
    case HIDE_LOADING: {
      return {
        ...state,
        loadingArray: action.response,
      };
    }
    case GET_COMPAIGNS: {
      return {
        ...state,
        compaign_array: action.response,
        checkArray: action.check,
        serverError: action.serverError,
        warningCheck: action.warningCheck,
        error: action.error,
      };
    }
    case GET_ONE_CAMPAIGN: {
      return {
        ...state,
        oneCampaign: action.response,
      };
    }
    case DELETE_COMPAIGN: {
      var compaign_array = state.compaign_array.filter(
        (item) => item.id !== action.campaign_id
      );
      return {
        ...state,
        compaign_array,
      };
    }
    default:
      return state;
  }
};
export default compaignsReducer;
