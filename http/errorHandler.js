function errorHandler (error, req, res, next) { // eslint-disable-line no-unused-vars
  const { app } = req;
  const { locals } = app;
  const { logger } = locals;

  logger.error(error.stack || error);
  if (!error.statusCode) {
    error.statusCode = 500;
  }

  res.status(error.statusCode).send(error.stack || error.message);
}

module.exports = { errorHandler };
