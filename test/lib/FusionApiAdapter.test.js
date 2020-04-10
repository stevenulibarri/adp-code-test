const { config } = require('../testSetup');
const { createLogger } = require('../../wireup/createLogger');

const { fusionApiKey, fusionApiBaseUrl } = config;
const logger = createLogger(config);

const { FusionApiAdapter } = require('../../lib/FusionApiAdapter');

const adapter = new FusionApiAdapter(logger, fusionApiBaseUrl, fusionApiKey);

describe('FusionApiAdapter', () => {
  test('searchBusinesses', async () => {
    const result = await adapter.searchBusinesses('mcdonalds', { location: 'Heber, UT', limit: 5, sortBy: 'rating' });
    expect(result).toBeDefined();
    expect(result.businesses).toBeDefined();
    expect(result.businesses.length).toBe(5);
  });

  test('getReviews', async () => {
    const queryResult = await adapter.searchBusinesses('mcdonalds', { location: 'Heber, UT', limit: 1, sortBy: 'rating' });
    const id = queryResult.businesses[0].id;

    const result = await adapter.getBusinessReviews(id);
    expect(result).toBeDefined();
    expect(result.reviews).toBeDefined();
    expect(result.reviews.length).toBe(3);
  });
});

