const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const log4js = require('log4js');
const bodyParser = require('body-parser');
const { apiErrorHandler, notFoundErrorHandler } = require('./api/middleware/errorHandlers');
const statusController = require('./api/controllers/status');
const helmet = require('helmet');

const appRoot = __dirname;

log4js.configure({
  appenders: [
        { type: 'console' },
  ],
});

const logger = log4js.getLogger('app');
logger.setLevel('INFO');

app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }));

app.use(bodyParser.json());
app.use(helmet());

SwaggerExpress.create({ appRoot }, (err, swaggerExpress) => {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  // Log any responses that violate the response schema
  swaggerExpress.runner.on(
    'responseValidationError',
    validationResponse =>
      logger.error(JSON.stringify(validationResponse.errors)) // eslint-disable-line
  );

  app.use(apiErrorHandler);
  app.use(notFoundErrorHandler);

  const port = process.env.PORT || 10010;
  app.listen(port);


  if (swaggerExpress.runner.swagger.paths['/status']) {
    // Map status to /status
    app.get('/status', statusController.status);

    logger.info(`\ntry this:\ncurl http://localhost:${port}/status`);
  }
});

if (process.env.swagger_mockMode || process.env.TEST_MODE === 'y') {
  logger.info('Running in mock mode');
}

module.exports = app;
