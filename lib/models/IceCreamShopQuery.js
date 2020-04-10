const assert = require('assert-plus');

class IceCreamShopQuery {
  constructor(location, limit, sortBy) {
    assert.string(location, 'location');
    assert.optionalNumber(limit, 'limit');
    assert.optionalString(sortBy, 'sortBy');

    Object.defineProperties(this, {
      location: { value: location, enumerable: true },
      limit: { value: limit, enumerable: true },
      sortBy: { value: sortBy, enumerable: true },
    });
  }
}

module.exports = { IceCreamShopQuery };
