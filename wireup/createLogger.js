const bunyan = require('bunyan');

function createLogger(config) {
  const { appName } = config;
  return bunyan.createLogger({ name: appName });
}

module.exports = { createLogger };
