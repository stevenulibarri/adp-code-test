const { config } = require('../testSetup');
const { IceCreamShopReviewRetriever } = require('../../lib/IceCreamShopReviewRetriever');
const { FusionApiAdapter } = require('../../lib/FusionApiAdapter');
const { createLogger } = require('../../wireup/createLogger');

jest.mock('../../lib/FusionApiAdapter');

const logger = createLogger(config);
const mockAdapter = new FusionApiAdapter();
const iceCreamShopReviewRetriever = new IceCreamShopReviewRetriever(logger, mockAdapter);

describe('IceCreamShopReviewRetriever', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getReviews', async () => {
    const name = 'test reviewer';
    const text = 'this a a review; 4 stars';
    const rating = 4;

    mockAdapter.getBusinessReviews.mockResolvedValue({
      reviews: [
        {
          text,
          rating,
          user: {
            name,
          },
        },
      ]
    });

    const result = await iceCreamShopReviewRetriever.getReviews('1234');
    expect(result).toBeDefined();
    expect(result.length).toBe(1);

    const review = result[0];
    expect(review).toBeDefined();
    expect(review.reviewer).toBe(name);
    expect(review.rating).toBe(rating);
    expect(review.text).toBe(text);
  });
});
