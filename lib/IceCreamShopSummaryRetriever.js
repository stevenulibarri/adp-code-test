const assert = require('assert-plus');
const { IceCreamShopSummary } = require('./models');

class IceCreamShopSummaryRetriever {
  constructor(logger, iceCreamShopRetriever, iceCreamShopReviewRetriever) {
    assert.object(logger, 'logger');
    assert.object(iceCreamShopRetriever, 'iceCreamShopRetriever');
    assert.object(iceCreamShopReviewRetriever, 'iceCreamShopReviewRetriever');

    Object.defineProperties(this, {
      logger: { value: logger },
      iceCreamShopRetriever: { value: iceCreamShopRetriever },
      iceCreamShopReviewRetriever: { value: iceCreamShopReviewRetriever },
    });
  }

  async getIceCreamShopSummaries(iceCreamShopQueryModel) {
    assert.object(iceCreamShopQueryModel, 'iceCreamShopQueryModel');

    const iceCreamShops = await this.iceCreamShopRetriever.queryIceCreamShops(iceCreamShopQueryModel);

    const summaries = [];
    for (const iceCreamShop of iceCreamShops) {
      const { id, name, address, rating } = iceCreamShop;
      const reviews = await this.iceCreamShopReviewRetriever.getReviews(id);

      const summary = new IceCreamShopSummary(id, name, address, rating, reviews[0]);
      summaries.push(summary);
    }

    return summaries;
  }
}

module.exports = { IceCreamShopSummaryRetriever };
