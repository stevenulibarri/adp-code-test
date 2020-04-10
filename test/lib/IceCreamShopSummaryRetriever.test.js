const { config } = require('../testSetup');
const { IceCreamShopSummaryRetriever } = require('../../lib/IceCreamShopSummaryRetriever');
const { IceCreamShopRetriever } = require('../../lib/IceCreamShopRetriever');
const { IceCreamShopReviewRetriever } = require('../../lib/IceCreamShopReviewRetriever');
const { createLogger } = require('../../wireup/createLogger');

const { IceCreamShop, IceCreamShopReview } = require('../../lib/models');

jest.mock('../../lib/IceCreamShopRetriever');
jest.mock('../../lib/IceCreamShopReviewRetriever');

const logger = createLogger(config);
const mockShopRetriever = new IceCreamShopRetriever();
const mockReviewRetriever = new IceCreamShopReviewRetriever();
const iceCreamShopSummaryRetriever = new IceCreamShopSummaryRetriever(logger, mockShopRetriever, mockReviewRetriever);

describe('IceCreamShopRetriever', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GetIceCreamShopSummaries', async () => {
    const shopId = '1234';
    const shopName = 'test shop';
    const shopAddress = 'test street, test city';
    const shopRating = 4;
    const reviewerName = 'test reviewer';
    const reviewText = 'this a a review; 4 stars';
    const reviewRating = 4;

    mockShopRetriever.queryIceCreamShops.mockResolvedValue([ new IceCreamShop(shopId, shopName, shopAddress, shopRating ) ]);
    mockReviewRetriever.getReviews.mockResolvedValue([ new IceCreamShopReview(reviewerName, reviewText, reviewRating) ]);

    const result = await iceCreamShopSummaryRetriever.getIceCreamShopSummaries({});
    expect(result).toBeDefined();
    expect(result.length).toBe(1);

    const summary = result[0];

    expect(summary).toBeDefined();
    expect(summary.id).toBe(shopId);
    expect(summary.name).toBe(shopName);
    expect(summary.address).toBe(shopAddress);
    expect(summary.rating).toBe(shopRating);
    expect(summary.review).toBeDefined();
    expect(summary.review.reviewer).toBe(reviewerName);
    expect(summary.review.text).toBe(reviewText);
    expect(summary.review.rating).toBe(reviewRating);
  });


});
