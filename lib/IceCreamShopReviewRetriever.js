const assert = require('assert-plus');
const { IceCreamShopReview } = require('./models');

class IceCreamShopReviewRetriever {
  constructor(logger, fusionApiAdapter) {
    assert.object(logger, 'logger');
    assert.object(fusionApiAdapter, 'fusionApiAdapter');

    Object.defineProperties(this, {
      logger: { value: logger },
      apiAdapter: { value: fusionApiAdapter },
    });
  }

  async getReviews(iceCreamShopId) {
    assert.string(iceCreamShopId, 'iceCreamShop');

    const result = await this.apiAdapter.getBusinessReviews(iceCreamShopId);
    const reviews = result.reviews.map(review => {
      const { rating, user, text } = review;
      const { name } = user;

      const iceCreamShopReview = new IceCreamShopReview(name, text, rating);
      return iceCreamShopReview;
    });

    return reviews;
  }
}

module.exports = { IceCreamShopReviewRetriever };
