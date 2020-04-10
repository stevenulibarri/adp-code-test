const assert = require('assert-plus');

class IceCreamShopSummary {
  constructor(id, name, address, rating, review) {
    assert.string(id, 'id');
    assert.string(name, 'name');
    assert.string(address, 'address');
    assert.number(rating, 'rating');
    assert.object(review, 'review');

    Object.defineProperties(this, {
      id: { value: id, enumerable: true },
      name: { value: name, enumerable: true },
      address: { value: address, enumerable: true },
      rating: { value: rating, enumerable: true },
      review: { value: review, enumerable: true },
    });
  }
}

module.exports = { IceCreamShopSummary };
