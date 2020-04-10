const { config } = require('../testSetup');
const { IceCreamShopRetriever } = require('../../lib/IceCreamShopRetriever');
const { FusionApiAdapter } = require('../../lib/FusionApiAdapter');
const { createLogger } = require('../../wireup/createLogger');

jest.mock('../../lib/FusionApiAdapter');

const logger = createLogger(config);
const mockAdapter = new FusionApiAdapter();
const iceCreamShopRetriever = new IceCreamShopRetriever(logger, mockAdapter);

describe('IceCreamShopRetriever', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('queryIceCreamShops', async () => {
    const id = '1234';
    const name = 'test shop';
    const street = 'test street';
    const city = 'test city';
    const rating = 4;

    mockAdapter.searchBusinesses.mockResolvedValue({
      businesses: [
        {
          id,
          name,
          rating,
          location: {
            city,
            address1: street,
          }
        }
      ]
    });

    const result = await iceCreamShopRetriever.queryIceCreamShops({});
    expect(result).toBeDefined();
    expect(result.length).toBe(1);

    const iceCreamShop = result[0];
    expect(iceCreamShop).toBeDefined();
    expect(iceCreamShop.id).toBe(id);
    expect(iceCreamShop.name).toBe(name);
    expect(iceCreamShop.rating).toBe(rating);
    expect(iceCreamShop.address).toBe(`${street}, ${city}`);
  });
});
