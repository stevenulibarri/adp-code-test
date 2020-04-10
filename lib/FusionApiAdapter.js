const assert = require('assert-plus');
const request = require('request-promise');

class FusionApiAdapter {
  constructor(logger, baseUrl, apiKey) {
    assert.object(logger, 'logger');
    assert.string(baseUrl, 'baseUrl');
    assert.string(apiKey, 'apiKey');

    Object.defineProperties(this, {
      logger: { value: logger },
      baseUrl: { value: baseUrl },
      apiKey: { value: apiKey },
    });
  }

  async searchBusinesses(term, query) {
    assert.string(term, 'term');
    assert.object(query, 'query');

    const {
      location,
      limit,
      sortBy,
    } = query;

    const url = `${this.baseUrl}/v3/businesses/search?term=${term}&location=${location}${limit ? '&limit=' + limit : '' }${sortBy ? '&sort_by=' + sortBy : '' }`;

    const result = await request(url, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      json: true,
    });

    return result;
  }

  async getBusinessReviews(businessId) {
    assert.string(businessId, 'businessId');

    const url = `${this.baseUrl}/v3/businesses/${businessId}/reviews`;

    const result = await request(url, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      json: true,
    });

    return result;
  }
}

module.exports = { FusionApiAdapter };
