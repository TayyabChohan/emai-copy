const PodcastOutreach = require("../Controller/podcastOutreachCtrl");
module.exports = (app) => {
  app.post("/podcastOutreachTemplate", PodcastOutreach.podcastOutreachTemplate);
  app.post(
    "/updatePodcastOutreachTemplate",
    PodcastOutreach.updatePodcastOutreachTemplate
  );
  app.post(
    "/podcastoutreach",
    PodcastOutreach.deleteCompaign
  );
};
