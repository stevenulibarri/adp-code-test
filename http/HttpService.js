const assert = require('assert-plus');

class HttpService {
  constructor(app, httpPort) {
    assert.func(app, 'app');
    assert.number(httpPort, 'httpPort');

    Object.defineProperties(this, {
      app: { value: app },
      port: { value: httpPort },
    });
  }

  start() {
    const { app, port } = this;
    const { locals } = app;
    const { logger } = locals;
    const server = app.listen(port, () => logger.info(`http service listening on ${port}`));

    process.on('unhandledRejection', err => {
      logger.error({ err }, 'An unhandled promise rejection causing the service to be recycled');
      server.close();
    });

    process.on('SIGTERM', () => server.close());
    process.on('SIGINT', () => server.close());

    Object.defineProperties(this, {
      server: { value: server },
    });
  }

  stop() {
    const { app, server } = this;
    const { locals } = app;
    const { logger } = locals;

    server.close(() => logger.info('http service closing'));
  }
}

module.exports = { HttpService };
