const { errorHandler } = require('./errorHandler');
const { HttpService } = require('./HttpService');
const { IceCreamShopController } = require('./IceCreamShopController');

const express = require('express');
const { Router } = express;

function wireupHttp(config, logger, lib) {
  const app = express();

  app.locals.logger = logger;
  const router = new Router();

  const { iceCreamShopSummaryRetriever } = lib;

  // todo: since I don't have an injector I should at least create a factory.
  const iceCreamShopController = new IceCreamShopController(iceCreamShopSummaryRetriever, router, logger); // eslint-disable-line no-unused-vars

  app.use(router, errorHandler);

  const { httpPort } = config;
  const httpService = new HttpService(app, httpPort);

  return {
    httpService,
  };
}

module.exports = { wireupHttp };
