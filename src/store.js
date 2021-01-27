import { createStore } from "redux";

// import defaultReducer from '../reducer/defaultReducer.js'
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import thunk from "redux-thunk";
import customerReducer from "./component/reducer/customerReducer";
import prewebinarofferReducer from "./component/reducer/prewebinarofferReducer";
import bondingSequenceReducer from "./component/reducer/bondingSequenceReducer";
import ascensionSeriesReducer from "./component/reducer/ascensionSeriesReducer";
import shoppingCartAbandonmentReducer from "./component/reducer/shoppingCartAbandonmentReducer";
import waitingListRelaunchReducer from "./component/reducer/waitingListRelaunchReducer";
import physicalProductReducer from "./component/reducer/physicalProductReducer";
import coldSimpleProspectingEmailReducer from "./component/reducer/coldSimpleProspectingEmailReducer";
import leadMagnetSequenceReportReducer from "./component/reducer/leadMagnetSequenceReportReducer";
import leadMagnetSequenceMultipleVideoReducer from "./component/reducer/leadMagnetSequenceMultipleVideoReducer";
import PodcastOutreachReducer from "./component/reducer/PodcastOutreachReducer";
import BloggerOutreachReducer from "./component/reducer/BloggerOutreachReducer";
import EvergreenWebinarReplayReducer from "./component/reducer/evergreenWebinarReplayReducer";
import webinarReplaySequenceReducer from "./component/reducer/webinarReplaySequenceReducer";
import VSLPromoSequenceReducer from "./component/reducer/VSLPromoSequenceReducer";
import salesLetterPromoSequenceReducer from "./component/reducer/salesLetterPromoSequenceReducer";
import postWabinarReducer from "./component/reducer/postWabinarEamailReducer";
import surveySequenceReducer from "./component/reducer/surveySequenceReducer";
import reEngagementReducer from "./component/reducer/reEngagementReducer";
import directRevenueReducer from "./component/reducer/directRevenueReducer";
import blogSequenceReducer from "./component/reducer/blogSequenceReducer";
import flasSAleReducer from "./component/reducer/flasSAleReducer";
import lmsVideoReducer from "./component/reducer/lmsVideoReducer";
import webinarPromoReducer from "./component/reducer/webinarPromoReducer";
import strategySessionReducer from "./component/reducer/strategySessionReducer";
import freeShippingReducer from "./component/reducer/freeShippingReducer";
import survivalNicheReducer from "./component/reducer/survivalNicheReducer";
import mensExBackReducer from "./component/reducer/mensExBackReducer";
import businessOpportunityReducer from "./component/reducer/businessOpportunityReducer";
import womenHealthReducer from "./component/reducer/womenHealthReducer";
import businessDevelopmentReducer from "./component/reducer/businessDevelopmentReducer";
import greenEnergyReducer from "./component/reducer/greenEnergyReducer";
import mensDatingReducer from "./component/reducer/mensDatingReducer";
import guitarNicheReducer from "./component/reducer/guitarNicheReducer";
import weddingsReducer from "./component/reducer/weddingsReducer";
import drawingReducer from "./component/reducer/drawingReducer";
import paleoLifestyleReducer from "./component/reducer/paleoLifestyleReducer";
import golfReducer from "./component/reducer/golfReducer";
import mindBrainReducer from "./component/reducer/mindBrainReducer";
import compaignsReducer from "./component/reducer/compaignsReducer";
import emailViewReducer from "./component/reducer/emailViewReducer";
import templatesReducer from "./component/reducer/templatesReducer";
import womenExbackReducer from "./component/reducer/womenExbackReducer";
import dogTrainingReducer from "./component/reducer/dogTrainingReducer";
import menFitnessReducer from "./component/reducer/menFitnessReducer";
import financeReducer from "./component/reducer/financeReducer";
import personalDevelopmentsReducer from "./component/reducer/personalDevelopmentsReducer";
import photographyNicheReducer from "./component/reducer/photographyNicheReducer";
import realEstateReducer from "./component/reducer/realEstateReducer";
const rootReducer = combineReducers({
  customerReducer,
  templatesReducer,
  prewebinarofferReducer,
  bondingSequenceReducer,
  ascensionSeriesReducer,
  shoppingCartAbandonmentReducer,
  waitingListRelaunchReducer,
  physicalProductReducer,
  coldSimpleProspectingEmailReducer,
  leadMagnetSequenceReportReducer,
  leadMagnetSequenceMultipleVideoReducer,
  PodcastOutreachReducer,
  BloggerOutreachReducer,
  EvergreenWebinarReplayReducer,
  webinarReplaySequenceReducer,
  VSLPromoSequenceReducer,
  salesLetterPromoSequenceReducer,
  survivalNicheReducer,
  mensExBackReducer,
  emailViewReducer,
  toastr: toastrReducer,
  strategySessionReducer,
  photographyNicheReducer,
  realEstateReducer,
  personalDevelopmentsReducer,
  financeReducer,
  menFitnessReducer,
  freeShippingReducer,
  dogTrainingReducer,
  womenExbackReducer,
  blogSequenceReducer,
  directRevenueReducer,
  webinarPromoReducer,
  flasSAleReducer,
  lmsVideoReducer,
  postWabinarReducer,
  reEngagementReducer,
  surveySequenceReducer,
  businessOpportunityReducer,
  womenHealthReducer,
  businessDevelopmentReducer,
  greenEnergyReducer,
  mensDatingReducer,
  guitarNicheReducer,
  weddingsReducer,
  drawingReducer,
  paleoLifestyleReducer,
  golfReducer,
  mindBrainReducer,
  compaignsReducer,
});
const composeEnhancers = composeWithDevTools({
serialize: true,
// Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const store = createStore(
rootReducer,
composeEnhancers(applyMiddleware(thunk))
);
export default store;