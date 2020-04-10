const assert = require('assert-plus');
const { IceCreamShop } = require('./models');

class IceCreamShopRetriever {
  constructor(logger, fusionApiAdapter) {
    assert.object(logger, 'logger');
    assert.object(fusionApiAdapter, 'fusionApiAdapter');

    Object.defineProperties(this, {
      logger: { value: logger },
      apiAdapter: { value: fusionApiAdapter },
    });
  }

  async queryIceCreamShops(iceCreamShopQueryModel) {
    assert.object(iceCreamShopQueryModel, 'iceCreamShopQueryModel');

    const result = await this.apiAdapter.searchBusinesses('ice cream shop', iceCreamShopQueryModel);
    const iceCreamShops = result.businesses.map(business => {
      const { id, name, rating, location } = business;
      const { address1, city } = location;

      const iceCreamShop = new IceCreamShop(id, name, `${address1}, ${city}`, rating);
      return iceCreamShop;
    });

    return iceCreamShops;
  }
}

module.exports = { IceCreamShopRetriever };
