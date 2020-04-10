const { config } = require('./wireup/config');
const { createLogger } = require('./wireup/createLogger');

const { wireupLib } = require('./lib/wiruepLib');
const { wireupHttp } = require('./http/wireupHttp');

const logger = createLogger(config);

const lib = wireupLib(config, logger);
const http = wireupHttp(config, logger, lib);

const { httpService } = http;

logger.info('starting http service');
httpService.start();

