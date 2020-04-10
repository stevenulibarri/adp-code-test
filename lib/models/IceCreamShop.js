const assert = require('assert-plus');

class IceCreamShop {
  constructor(id, name, address, rating) {
    assert.string(id, 'id');
    assert.string(name, 'name');
    assert.string(address, 'address');
    assert.number(rating, 'rating');

    Object.defineProperties(this, {
      id: { value: id, enumerable: true },
      name: { value: name, enumerable: true },
      address: { value: address, enumerable: true },
      rating: { value: rating, enumerable: true },
    });
  }
}

module.exports = { IceCreamShop };
