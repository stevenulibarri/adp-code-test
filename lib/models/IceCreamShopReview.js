const assert = require('assert-plus');

class IceCreamShopReview {
  constructor(reviewer, text, rating) {
    assert.string(reviewer, 'reviewer');
    assert.string(text, 'text');
    assert.number(rating, 'rating');

    Object.defineProperties(this, {
      reviewer: { value: reviewer, enumerable: true },
      text: { value: text, enumerable: true },
      rating: { value: rating, enumerable: true },
    });
  }
}

module.exports = { IceCreamShopReview };
