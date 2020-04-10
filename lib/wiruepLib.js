const { FusionApiAdapter } = require('./FusionApiAdapter');
const { IceCreamShopRetriever } = require('./IceCreamShopRetriever');
const { IceCreamShopReviewRetriever } = require('./IceCreamShopReviewRetriever');
const { IceCreamShopSummaryRetriever } = require('./IceCreamShopSummaryRetriever');

function wireupLib(config, logger) {
  const {
    fusionApiKey,
    fusionApiBaseUrl,
  } = config;

  const fusionApiAdapater = new FusionApiAdapter(logger, fusionApiBaseUrl, fusionApiKey);
  const iceCreamShopRetriever = new IceCreamShopRetriever(logger, fusionApiAdapater);
  const iceCreamShopReviewRetriever = new IceCreamShopReviewRetriever(logger, fusionApiAdapater);
  const iceCreamShopSummaryRetriever = new IceCreamShopSummaryRetriever(logger, iceCreamShopRetriever, iceCreamShopReviewRetriever);

  return {
    fusionApiAdapater,
    iceCreamShopRetriever,
    iceCreamShopReviewRetriever,
    iceCreamShopSummaryRetriever,
  };
}

module.exports = { wireupLib };

