require('dotenv').config();

const config = {
  fusionApiKey: process.env.FUSION_API_KEY,
  fusionApiBaseUrl: process.env.FUSION_API_BASE_URL,
  appName: process.env.APP_NAME,
};

module.exports = { config };
