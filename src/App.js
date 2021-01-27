import React, { Component } from "react";
import NavBar from "./component/layout/navbar/NavBar";
import Loader from "./component/Loader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllCompaigns,
  hideLoading,
} from "./component/actions/campaignsAction.js";
import history from "./component/history";
import "./mainStyleSheet/app.css";
import "gasparesganga-jquery-loading-overlay";
import Dashboard from "./component/Dashboard";
import ServerError from "./component/ServerError";
import PreWebinarEmail from "./component/customerTemplate/PreWebinarEmail";
import PostWebinarEmail from "./component/customerTemplate/PostWebinarEmail";
import TemplateListPage from "./component/TemplateListPage.js";
import PreviewEmail from "./component/customerTemplate/PreviewEmail";
import CustomizeEmail from "./component/customerTemplate/CustomizeEmail";
import Campaign from "./component/customerTemplate/Campaign";
import SurveySequence from "./component/customerTemplate/SurveySequence";
import ReEngagement from "./component/customerTemplate/ReEngagement";
import BondingSequence from "./component/customerTemplate/BondingSequence";
import AscensionSeries from "./component/customerTemplate/AscensionSeries";
import DirectRevenue from "./component/customerTemplate/DirectRevenue";
import ShoppingCartAbandonment from "./component/customerTemplate/ShoppingCartAbandonment";
import WaitingListRelaunch from "./component/customerTemplate/WaitingListRelaunch";
import SinglePhysicalProduct from "./component/customerTemplate/SinglePhysicalProduct";
import ColdSimpleProspectingEmail from "./component/customerTemplate/ColdSimpleProspectingEmail";
import LeadMagnetSequenceReport from "./component/customerTemplate/LeadMagnetSequenceReport";
import LeadMagnetSequenceMultipleVideo from "./component/customerTemplate/LeadMagnetSequenceMultipleVideos";
import WomenExBack from "./component/customerTemplate/WomenExBack.js";
import DogTraining from "./component/customerTemplate/DogTraining.js";
import MenFitness from "./component/customerTemplate/MenFitness.js";
import Finance from "./component/customerTemplate/Finance";
import PersonalDevelopment from "./component/customerTemplate/PersonalDevelopment";
import PhotographyNiche from "./component/customerTemplate/PhotographyNiche.js";
import RealEstate from "./component/customerTemplate/RealEstate.js";
import SurvivalNiche from "./component/customerTemplate/SurvivalNiche";
import MensExBack from "./component/customerTemplate/MensExBack";
import BusinessOpportunity from "./component/customerTemplate/BusinessOpportunity";
import WomenHealth from "./component/customerTemplate/WomenHealth";
import BusinessDevelopment from "./component/customerTemplate/BusinessDevelopment";
import GreenEnergy from "./component/customerTemplate/GreenEnergy";
import MensDating from "./component/customerTemplate/MensDating";
import GuitarNiche from "./component/customerTemplate/GuitarNiche";
import Weddings from "./component/customerTemplate/Weddings";
import Drawing from "./component/customerTemplate/Drawing";
import PaleoLifestyle from "./component/customerTemplate/PaleoLifestyle";
import Golf from "./component/customerTemplate/Golf";
import MindBrain from "./component/customerTemplate/MindBrain";
import VSLPromoSequence from "./component/customerTemplate/VSLPromoSequence.js";
import WebinarReplaySequence from "./component/customerTemplate/WebinarReplaySequence.js";
import EvergreenWebinarReplay from "./component/customerTemplate/EvergreenWebinarReplay.js";
import BloggerOutreach from "./component/customerTemplate/BloggerOutreach.js";
import PodcastOutreach from "./component/customerTemplate/PodcastOutreach.js";
import StrategySession from "./component/customerTemplate/StrategySession.js";
import FreeShipping from "./component/customerTemplate/FreeShipping.js";
import WebinarPromo from "./component/customerTemplate/WebinarPromo.js";
import FlashSale from "./component/customerTemplate/FlashSale.js";
import LmsVideo from "./component/customerTemplate/LmsVideo.js";
import SalesLetterPromoSequence from "./component/customerTemplate/SalesLetterPromoSequence.js";
import BlogSequence from "./component/customerTemplate/BlogSequence.js";
const action = {
  getAllCompaigns,
  hideLoading,
};
class App extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.checkArray === false && this.props.serverError === true ? (
          <ServerError />
        ) : (
          <Router history={history}>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route
                exact
                path="/mindbrain/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={MindBrain}
              />
              <Route
                exact
                path="/golf/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={Golf}
              />
              <Route
                exact
                path="/paleolifestyle/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={PaleoLifestyle}
              />
             
              <Route
                exact
                path="/drawing/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={Drawing}
              />
              <Route
                exact
                path="/weddings/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={Weddings}
              />
              <Route
                exact
                path="/guitarniche/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={GuitarNiche}
              />
              <Route
                exact
                path="/mensdating/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={MensDating}
              />
              <Route
                exact
                path="/greenenergy/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={GreenEnergy}
              />
              <Route
                exact
                path="/businessdevelopment/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={BusinessDevelopment}
              />
              <Route
                exact
                path="/womenhealth/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={WomenHealth}
              />
              <Route
                exact
                path="/businessopportunity/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={BusinessOpportunity}
              />
              <Route
                exact
                path="/mensexback/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={MensExBack}
              />
              <Route
                exact
                path="/survivalniche/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={SurvivalNiche}
              />
              <Route
                exact
                path="/directrevenue/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={DirectRevenue}
              />
              <Route
                exact
                path="/salesletterpromosequence/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={SalesLetterPromoSequence}
              />
              <Route
                exact
                path="/vslpromosequence/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={VSLPromoSequence}
              />
              <Route
                exact
                path="/webinarreplaysequence/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={WebinarReplaySequence}
              />
              <Route
                exact
                path="/evergreenwebinarreplay/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={EvergreenWebinarReplay}
              />

              <Route
                exact
                path="/bloggeroutreach/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={BloggerOutreach}
              />
              <Route
                exact
                path="/podcastoutreach/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={PodcastOutreach}
              />
              <Route
                exact
                path="/leadmagnetsequencemultiplevideo/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={LeadMagnetSequenceMultipleVideo}
              />
              <Route
                exact
                path="/leadmagnetsequencereport/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={LeadMagnetSequenceReport}
              />
              <Route
                exact
                path="/coldsimpleprospectingemail/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={ColdSimpleProspectingEmail}
              />
              <Route
                exact
                path="/singlephysicalproduct/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={SinglePhysicalProduct}
              />

              <Route
                exact
                path="/ascensionseries/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={AscensionSeries}
              />
              <Route
                exact
                path="/strategysession/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={StrategySession}
              />
              <Route
                exact
                path="/realestate/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={RealEstate}
              />
              <Route
                exact
                path="/personaldevelopment/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={PersonalDevelopment}
              />
              <Route
                exact
                path="/photographyniche/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={PhotographyNiche}
              />
              <Route
                exact
                path="/dogtraining/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={DogTraining}
              />
              <Route
                exact
                path="/finance/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={Finance}
              />
              <Route
                exact
                path="/womenexback/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={WomenExBack}
              />
              <Route
                exact
                path="/menfitness/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={MenFitness}
              />
              <Route
                exact
                path="/freeshipping/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={FreeShipping}
              />
              <Route
                exact
                path="/webinarpromo/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={WebinarPromo}
              />
              <Route
                exact
                path="/flashsale/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={FlashSale}
              />
              <Route
                exact
                path="/lmsvideo/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={LmsVideo}
              />
              <Route
                exact
                path="/blogsequence/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={BlogSequence}
              />
              <Route
                exact
                path="/bondingsequence/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={BondingSequence}
              />
              <Route
                exact
                path="/waitinglistrelaunch/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={WaitingListRelaunch}
              />
              <Route
                exact
                path="/shoppingcartabandonment/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={ShoppingCartAbandonment}
              />

              <Route
                exact
                path="/surveysequence/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={SurveySequence}
              />
              <Route
                exact
                path="/reengagement/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={ReEngagement}
              />

              <Route
                exact
                path="/postwebinaremail/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={PostWebinarEmail}
              />
              <Route
                exact
                path="/previewemail/:compaignID/:title"
                component={PreviewEmail}
              />
              <Route
                exact
                path="/customizeemail/:compaignID/:title"
                component={CustomizeEmail}
              />
              <Route exact path="/campaign/:compaignID" component={Campaign} />
              <Route
                exact
                path="/prewebinaremail/:template_id/:templateCode/:compaignTitle/:saveOrUpdate"
                component={PreWebinarEmail}
              />
              <Route
                exact
                path="/templatelistpage"
                component={TemplateListPage}
              />
            </Switch>
          </Router>
        )}

        <Loader />
      </React.Fragment>
    );
  }
}

const mapsToprops = (state) => {
  return {
    checkArray: state.compaignsReducer.checkArray,
    serverError: state.compaignsReducer.serverError,
    warningCheck: state.compaignsReducer.warningCheck,
    loadingArray: state.compaignsReducer.loadingArray,
  };
};

export default connect(mapsToprops, action)(App);
