const assert = require('assert-plus');
const { asyncHandler } = require('./asyncHandler');
const { IceCreamShopQuery } = require('../lib/models');

class IceCreamShopController {
  constructor(iceCreamShopSummaryRetriever, httpRouter, logger) {
    assert.object(iceCreamShopSummaryRetriever, 'iceCreamShopSummaryRetriever');
    assert.func(httpRouter, 'httpRouter');

    Object.defineProperties(this, {
      iceCreamShopSummaryRetriever: { value: iceCreamShopSummaryRetriever },
      logger: { value: logger },
    });

    this.registerRoutes(httpRouter);
  }

  registerRoutes(router) {
    const route = '/iceCreamShops';
    router.get(`${route}/summaries`, asyncHandler(this.retrieveIceCreamShopSummaries.bind(this)));
  }

  async retrieveIceCreamShopSummaries(req, res) {
    this.logger.debug(req.body, 'requestRecieved POST /iceCreamShops');

    const { query } = req;
    const { location, limit, sortBy } = query;

    const queryModel = new IceCreamShopQuery(location, limit | 0, sortBy);

    const result = await this.iceCreamShopSummaryRetriever.getIceCreamShopSummaries(queryModel);
    this.logger.debug(result);
    return res.json(result);
  }
}

module.exports = { IceCreamShopController };
